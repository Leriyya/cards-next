import Header from "@/components/header/header";
import WineCards from "@/components/wineCards/wineCards";
import styles from "../filter.module.css";
import { getWineCategory } from "@/helpers";

type WineType = "white" | "red" | "sparkling" | "rose";
type WineSweetness = "Сладкое" | "Полусладкое" | "Без сахара";
type WineCountry = "Италия" | "Франция" | "США";
type WineRegion = "Пьемонт" | "Бароло" | "Бордо" | "Напа" | "СантаБарбара";
type WineDescriptions = "best wine" | "excellent wine" | "great wine";
type WineSize = "0.5" | "0.7" | "1" | "0.62" | "0.75" | "3" | "1.5";

export interface TWineCard {
  id: number;
  image: string;
  name: string;
  description: WineDescriptions;
  type: WineType;
  sugar: WineSweetness;
  country: WineCountry;
  region: WineRegion;
  volume: WineSize;
  price: number;
}

export const getData = async (category: string) => {
  return await getWineCategory(category)
}

export default async function Filter({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main className={styles.container}>
        <WineCards cards={data} />
      </main>
    </div>
  );
}