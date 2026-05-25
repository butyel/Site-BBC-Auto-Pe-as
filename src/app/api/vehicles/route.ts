import { NextRequest, NextResponse } from "next/server";

const VEHICLE_DATA: Record<string, string[]> = {
  Volkswagen: ["Gol", "Polo", "T-Cross", "Nivus", "Taos", "Amarok", "Saveiro", "Virtus", "Tiguan"],
  Chevrolet: ["Onix", "Tracker", "S10", "Cruze", "Spin", "Cobalt", "Montana", "Equinox", "Camaro"],
  Fiat: ["Uno", "Mobi", "Argo", "Cronos", "Strada", "Toro", "Pulse", "Fastback", "Doblo"],
  Ford: ["Ka", "EcoSport", "Ranger", "Focus", "Fiesta", "Mustang", "Territory", "Fusion"],
  Toyota: ["Corolla", "Hilux", "Yaris", "SW4", "Etios", "Camry", "RAV4", "Corolla Cross"],
  Honda: ["Civic", "HR-V", "Fit", "City", "CR-V", "WR-V", "Accord"],
  Hyundai: ["HB20", "Creta", "Tucson", "Azera", "Santa Fe", "i30", "Elantra"],
  Nissan: ["Kicks", "Versa", "Frontier", "Sentra", "March", "Leaf"],
  Renault: ["Kwid", "Sandero", "Duster", "Captur", "Oroch", "Logan", "Master"],
  Jeep: ["Renegade", "Compass", "Wrangler", "Cherokee", "Commander"],
};

const YEARS = Array.from({ length: 6 }, (_, i) => 2020 + i);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");
    const model = searchParams.get("model");

    if (!brand && !model) {
      return NextResponse.json({
        brands: Object.keys(VEHICLE_DATA),
      });
    }

    if (brand && !model) {
      const models = VEHICLE_DATA[brand] || [];
      return NextResponse.json({ brand, models, years: YEARS });
    }

    if (brand && model) {
      return NextResponse.json({ brand, model, years: YEARS });
    }

    return NextResponse.json({
      brands: Object.keys(VEHICLE_DATA),
    });
  } catch (error) {
    console.error("Vehicles GET error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
