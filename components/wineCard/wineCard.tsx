"use client";
import Image from "next/image";
import styles from "./wineCard.module.css";
import { TWineCard } from "@/app/filter/page";

export const WineCard: React.FC<TWineCard> = ({ image, name, price }) => {
  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt="wine"
        width={290}
        height={290}
        className={styles.cart}
      />
      <div className={styles.cardContent}>
       
        <div className={styles.cardTitle}>{name}</div>
        <div className={styles.cardOrder}>
          <div className={styles.cardPrice}>{price} ₽</div>
          <button className={styles.cardButton}>Купить</button>
        </div>
      </div>
    </div>
  );
};
