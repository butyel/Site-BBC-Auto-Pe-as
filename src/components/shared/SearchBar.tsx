"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
}

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  className,
  placeholder = "Buscar peças, óleos, filtros...",
  autoFocus = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    fetch(`/api/products?search=${encodeURIComponent(debouncedQuery)}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.items || []);
        setIsOpen(true);
      })
      .catch(() => {
        setResults([]);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/loja?search=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [query, router]
  );

  const handleSelect = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bbc focus:border-transparent focus:bg-white transition-colors"
            onFocus={() => results.length > 0 && setIsOpen(true)}
          />
        </div>
      </form>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
        >
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Buscando...
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="max-h-80 overflow-y-auto">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={`/produto/${result.slug}`}
                    onClick={handleSelect}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0 flex items-center justify-center text-xs text-gray-400">
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        "IMG"
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {result.name}
                      </p>
                      <p className="text-sm font-semibold text-bbc">
                        R$ {result.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {debouncedQuery && (
                <Link
                  href={`/loja?search=${encodeURIComponent(debouncedQuery)}`}
                  onClick={handleSelect}
                  className="block px-4 py-2.5 text-center text-sm text-bbc hover:bg-accent font-medium border-t border-gray-100 transition-colors"
                >
                  Ver todos os resultados para &ldquo;{debouncedQuery}&rdquo;
                </Link>
              )}
            </>
          ) : debouncedQuery.length >= 2 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Nenhum resultado encontrado para &ldquo;{debouncedQuery}&rdquo;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
