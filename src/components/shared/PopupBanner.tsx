"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PopupData {
  id: string;
  title?: string;
  image: string;
  link?: string;
  expiresAt?: string | null;
}

export default function PopupBanner() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch("/api/popups")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data[0];
          if (active.expiresAt && new Date(active.expiresAt) < new Date()) {
            return;
          }
          const dismissed = sessionStorage.getItem(
            `popup-dismissed-${active.id}`
          );
          if (!dismissed) {
            setPopup(active);
            setTimeout(() => setIsVisible(true), 1000);
          }
        }
      })
      .catch(console.error);
  }, []);

  const handleDismiss = useCallback(() => {
    if (popup) {
      sessionStorage.setItem(`popup-dismissed-${popup.id}`, "true");
    }
    setIsVisible(false);
    setTimeout(() => setPopup(null), 300);
  }, [popup]);

  if (!popup) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleDismiss}
      />
      <div
        className={cn(
          "relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300",
          isVisible ? "scale-100" : "scale-95"
        )}
      >
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-10 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {popup.link ? (
          <Link href={popup.link} onClick={handleDismiss}>
            <img
              src={popup.image}
              alt={popup.title || "Popup"}
              className="w-full h-auto"
            />
          </Link>
        ) : (
          <img
            src={popup.image}
            alt={popup.title || "Popup"}
            className="w-full h-auto"
          />
        )}
      </div>
    </div>
  );
}
