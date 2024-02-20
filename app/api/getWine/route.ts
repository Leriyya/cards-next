import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const { search, category } = req.query || { search: "", query: "" };
  const products = await fetchProducts({ search, category });
  return new NextResponse(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

async function fetchProducts({ search, category }: any) {
  const wineNames = [
    "Вино Barale Fratelli, Barolo Chinato",
    "Вино Castello di Amorosa, Super Tuscan",
    "Сира (Шираз) / Syrah",
    "Пино Нуар",
    "Зинфандель (Zinfandel) ",
    "Пино Гри (Pinot Gris) ",
    "Киндзмараули",
    "Кахети",
    "Ркацители",
    "Мукузани",
    "Саперави",
    "Баракони",
    "Цинандали",
    "Шардоне",
  ];

  const wineTypes = ["red", "white", "rose", "sparkling"];
  const sugarLevels = ["Сладкое", "Полусладкое", "Без сахара"];
  const countries = ["Италия", "Франция", "США"];
  const regions = ["Пьемонт", "Бароло", "Бордо", "Напа", "СантаБарбара"];
  const volumes = ["0.5", "0.7", "1", "0.62", "0.75", "3", "1.5"];
  const descriptions = ["best wine", "excellent wine", "great wine"];

  function generateWine() {
    return {
      id: Math.floor(Math.random() * 999) + 1,
      name: wineNames[Math.floor(Math.random() * wineNames.length)],
      price: Math.floor(Math.random() * 10000) + 1000,
      type: wineTypes[Math.floor(Math.random() * wineTypes.length)],
      sugar: sugarLevels[Math.floor(Math.random() * sugarLevels.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      volume: volumes[Math.floor(Math.random() * volumes.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      image: "/img/wines/" + Math.floor(Math.random() * 15 + 1) + ".jpg",
    };
  }

  const wines = Array.from({ length: 200 }, generateWine);

  return wines;
}
