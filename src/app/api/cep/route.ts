import { NextRequest, NextResponse } from "next/server";

const MOCK_CEP_DATA: Record<string, { street: string; neighborhood: string; city: string; state: string }> = {
  "01001000": {
    street: "Praça da Sé",
    neighborhood: "Sé",
    city: "São Paulo",
    state: "SP",
  },
  "20040002": {
    street: "Rua da Carioca",
    neighborhood: "Centro",
    city: "Rio de Janeiro",
    state: "RJ",
  },
  "30140070": {
    street: "Rua da Bahia",
    neighborhood: "Centro",
    city: "Belo Horizonte",
    state: "MG",
  },
  "80020000": {
    street: "Rua XV de Novembro",
    neighborhood: "Centro",
    city: "Curitiba",
    state: "PR",
  },
  "90010000": {
    street: "Rua dos Andradas",
    neighborhood: "Centro Histórico",
    city: "Porto Alegre",
    state: "RS",
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cep = searchParams.get("cep");

    if (!cep) {
      return NextResponse.json(
        { error: "CEP é obrigatório" },
        { status: 400 }
      );
    }

    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      return NextResponse.json(
        { error: "CEP deve conter 8 dígitos" },
        { status: 400 }
      );
    }

    const cached = MOCK_CEP_DATA[cleanCep];

    if (cached) {
      return NextResponse.json({
        cep: cleanCep,
        street: cached.street,
        neighborhood: cached.neighborhood,
        city: cached.city,
        state: cached.state,
      });
    }

    return NextResponse.json({
      cep: cleanCep,
      street: "Rua genérica",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
    });
  } catch (error) {
    console.error("CEP GET error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
