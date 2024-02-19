import styles from "./cards.module.css";
import { Card } from "../card/card";
import { TCard } from "@/app/page";

interface Props {
  cards: TCard[];
}

export default function Cards({ cards }: Props) {
  return (
    <div className={styles.cards}>
      <div className={styles.breadcrumbs}>
        <a href="/">Главная</a>/<a href="/menu">Меню</a>/
        <a href="/category">Категория товаров</a>
      </div>
      <div className={styles.title}>Название категории</div>
      <div className={styles.cardsList}>
        {cards.map((card) => (
          <Card
            image={card.image}
            title={card.title}
            description={card.description}
            priceStandart={card.priceStandart}
            priceDouble={card.priceDouble}
          />
        ))}
      </div>
    </div>
  );
}
