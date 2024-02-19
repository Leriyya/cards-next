import Header from "@/components/header/header";
import Cards from "@/components/cardsShort/cards";
import Footer from "@/components/footer/footer";

const cardsMock: TCard[] = [
  {
    image: "/img/dish.png",
    title: "Товар 1",
    description:
      "Здесь будет описание товара.У некоторых товаров описание может быть коротким, а у некоторых - длинным.",
    priceDouble: 250,
    priceStandart: 190,
  },
  {
    image: "/img/dish.png",
    title: "Товар 2",
    priceDouble: 250,
    priceStandart: 190,
    description:
      "Здесь будет описание товара.У некоторых товаров описание может быть коротким, а у некоторых - длинным. Здесь будет описание товара.У некоторых товаров описание может быть коротким, а у некоторых - длинным.",
  },
  {
    image: "/img/dish.png",
    title: "Товар 3",
    priceDouble: 250,
    priceStandart: 190,
    description:
      "Здесь будет описание товара.У некоторых товаров описание может быть коротким, а у некоторых - длинным.",
  },
  {
    image: "/img/dish.png",
    title: "Товар 4",
    priceDouble: 250,
    priceStandart: 190,
    description:
      "Здесь будет описание товара.У некоторых товаров описание может быть коротким, а у некоторых - длинным. У будет описание товара.У некоторых товаров описание может быть коротким, а у некоторых - длинным.",
  },
];

export interface TCard {
  image: string;
  title: string;
  priceDouble: number;
  priceStandart: number;
  description: string;
}

export const getData = async () => {
  return { cards: cardsMock };
};

export default async function Home() {
  const data = await getData();
  return (
    <>
      <header>
        <Header />
      </header>
      <main >
        <Cards cards={data.cards} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
