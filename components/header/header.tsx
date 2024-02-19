"use client";
import Image from "next/image";
import styles from "./header.module.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  const handlePhoneNumberClick = () => {
    if (isMobile) {
      const phoneNumber = "7-812-944-4490";
      window.location.href = `tel:${phoneNumber}`;
    }
  };
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          Лого
        </a>
        <div className={styles.info}>
          <div className={styles.contact} onClick={handlePhoneNumberClick}>
            +7 (812) <span className={styles.contactNumber}>944-4490</span>
          </div>
          <div className={styles.cartContainer}>
            <Image
              src={"./svg/cart.svg"}
              alt="cart"
              width={70}
              height={24}
              className={styles.cart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
