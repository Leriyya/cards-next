import { TWineCard } from "@/app/filter/page";

export const getData = async () => {
  const res = await fetch("http://localhost:3000/api/getWine", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const getWineCategory = async (description: string): Promise<TWineCard[]> => {
  const items = await getData();
  
  const wineCategory = items.filter(
    (wine: any) => wine.description == description
  );

  return wineCategory;
};
