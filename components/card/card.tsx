"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./card.module.css";

interface CardProps extends React.PropsWithChildren {
  image: any;
  className?: string;
  title?: string;
  description?: string;
  priceStandart?: number;
  priceDouble?: number;
  sign?: boolean;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  priceStandart,
  priceDouble,
  sign = false,
}) => {
  const [isDouble, setIsDouble] = useState(true);

  return (
    <div className={styles.card}>
      {sign && (
        <div className={styles.sign}>
          <Image src={"./svg/sign.svg"} alt="sign" width={70} height={39} />
        </div>
      )}
      <Image
        src={image}
        alt="cart"
        width={290}
        height={190}
        className={styles.cart}
      />
      <div className={styles.cardContent}>
        <div>
          <div className={styles.cardTitle}>{title}</div>

          <div className={styles.cardDescription}>{description}</div>
        </div>
      </div>
      <div className={styles.cardBtm}>
        <div className={styles.switchContainer}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              onChange={() => setIsDouble(!isDouble)}
              checked={isDouble}
            />
            <span className={styles.slider}></span>
          </label>
          <div className={styles.types}>
            <div>Стандарт</div>
            <div>Двойной</div>
          </div>
        </div>
        <div className={styles.cardOrder}>
          <div className={styles.cardPrice}>
            {isDouble ? priceDouble : priceStandart} ₽
          </div>
          <button className={styles.cardButton}>Заказать</button>
        </div>
      </div>
    </div>
  );
};
