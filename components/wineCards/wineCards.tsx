"use client";
import { useState } from "react";
import { Filter } from "../filter/filter";
import { WineCard } from "../wineCard/wineCard";
import styles from "./wineCards.module.css";
import { TWineCard } from "@/app/filter/page";

interface Props {
  cards: TWineCard[];
}

export default function WineCards({ cards }: Props) {
  const [filteredCards, setFilteredCards] = useState(cards);

  return (
    <>
      <Filter
        cards={cards}
        filteredCards={filteredCards}
        setFilteredCards={setFilteredCards}
      />
      <div className={styles.cards}>
        <div className={styles.breadcrumbs}>
          <a href="/">Главная</a>/<a href="/menu">Меню</a>/
          <a href="/category">Категория товаров</a>
        </div>
        <div className={styles.title}>Вина</div>
        <div className={styles.cardsList}>
          {filteredCards.map((card, i) => (
            <WineCard
              key={i}
              id={card.id}
              image={card.image}
              name={card.name}
              description={card.description}
              country={card.country}
              region={card.region}
              type={card.type}
              sugar={card.sugar}
              price={card.price}
              volume={card.volume}
            />
          ))}
        </div>
      </div>
    </>
  );
}
