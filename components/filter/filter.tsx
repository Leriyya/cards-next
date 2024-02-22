"use client";
import { TWineCard } from "@/app/filter/page";
import styles from "./filter.module.css";
import { useEffect, useState } from "react";
import { CheckboxGroup, TCheckbox } from "../checkboxGroup/checkbox";
import { Slider } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  cards: TWineCard[];
  setFilteredCards: Function;
  filteredCards: TWineCard[];
}

const filtersParams = {
  price: {
    max: 100,
    value: [0, 100],
  },
  type: {
    white: {
      checked: false,
      title: "белое",
    },
    red: {
      checked: false,
      title: "красное",
    },
    sparkling: {
      checked: false,
      title: "игристое",
    },
    rose: {
      checked: false,
      title: "розовое",
    },
  },
  country: {
    Италия: {
      checked: false,
      title: "Италия",
    },
    Франция: {
      checked: false,
      title: "Франция",
    },
    США: {
      checked: false,
      title: "США",
    },
  },
  region: {
    Пьемонт: {
      checked: false,
      title: "Пьемонт",
    },
    Бароло: {
      checked: false,
      title: "Бароло",
    },
    Бордо: {
      checked: false,
      title: "Бордо",
    },
    Напа: {
      checked: false,
      title: "Напа",
    },
    СантаБарбара: {
      checked: false,
      title: "СантаБарбара",
    },
  },
  sugar: {
    Сладкое: {
      checked: false,
      title: "Сладкое",
    },
    Полусладкое: {
      checked: false,
      title: "Полусладкое",
    },
    "Без сахара": {
      checked: false,
      title: "Без сахара",
    },
  },
  volume: {
    0.5: {
      checked: false,
      title: "0.5",
    },
    0.7: {
      checked: false,
      title: "0.7",
    },
    0.62: {
      checked: false,
      title: "0.62",
    },
    0.75: {
      checked: false,
      title: "0.75",
    },
    1: {
      checked: false,
      title: "1",
    },
    1.5: {
      checked: false,
      title: "1.5",
    },
    3: {
      checked: false,
      title: "3",
    },
  },
};

const filtersCounterParams = {
  type: {
    white: 0,
    red: 0,
    sparkling: 0,
    rose: 0,
  },
  country: {
    Италия: 0,
    Франция: 0,
    США: 0,
  },
  region: {
    Пьемонт: 0,
    Бароло: 0,
    Бордо: 0,
    Напа: 0,
    СантаБарбара: 0,
  },
  sugar: {
    Сладкое: 0,
    Полусладкое: 0,
    "Без сахара": 0,
  },
  volume: {
    0.5: 0,
    0.7: 0,
    0.62: 0,
    0.75: 0,
    1: 0,
    1.5: 0,
    3: 0,
  },
};

const categoryParams = [
  {
    descriptions: "best-wine",
    title: "лучшие вина",
  },
  {
    descriptions: "excellent-wine",
    title: "отличные вина",
  },
  {
    descriptions: "great-wine",
    title: "замечательные",
  },
];

export function Filter({ cards, setFilteredCards }: Props) {
  const [filters, setFilters] = useState(filtersParams);
  const [counter, setCounter] = useState(filtersCounterParams);

  function handleChanges(event: any, newValue: any) {
    let copy = JSON.parse(JSON.stringify(filters));
    copy.price.value = newValue;
    setFilters(copy);
  }

  useEffect(() => {
    let copy = JSON.parse(JSON.stringify(filters));
    copy.price.max = cards.reduce(
      (acc, curr) => (curr.price > acc ? curr.price : acc),
      0
    );
    copy.price.value = [0, copy.price.max];
    setFilters(copy);
  }, []);

  useEffect(() => {
    let counterCopy = JSON.parse(JSON.stringify(filtersCounterParams));

    const newCards = cards.filter((card) => {
      if (card.price > Math.max(...filters.price.value) || card.price < Math.min(...filters.price.value)) return false

      if (isCheckedInOtherGroups(card, "type")) counterCopy.type[card.type]++
      if (!filters.type[card.type].checked && !isAllUnchecked(filters.type)) return false

      if (isCheckedInOtherGroups(card, "sugar")) counterCopy.sugar[card.sugar]++
      if (!filters.sugar[card.sugar].checked &&!isAllUnchecked(filters.sugar)) return false
    
      if (isCheckedInOtherGroups(card, "country")) counterCopy.country[card.country]++
      if (!filters.country[card.country].checked && !isAllUnchecked(filters.country)) return false

      if (isCheckedInOtherGroups(card, "region")) counterCopy.region[card.region]++
      if ( !filters.region[card.region].checked && !isAllUnchecked(filters.region)) return false

      if (isCheckedInOtherGroups(card, "volume")) counterCopy.volume[card.volume]++
      if (!filters.volume[card.volume].checked && !isAllUnchecked(filters.volume)) return false

      return true;
    });
    setFilteredCards(newCards);
    setCounter(counterCopy);
  }, [filters]);

  const isAllUnchecked = (checkboxGroup: {
    [k: string]: TCheckbox;
  }): Boolean => {
    return Object.keys(checkboxGroup).reduce((acc, curr) => {
      return acc && !checkboxGroup[curr].checked;
    }, true);
  };

  const isCheckedInOtherGroups = (card: TWineCard, currentGroup: string) => {
    if (!filters.type[card.type].checked && !isAllUnchecked(filters.type) && currentGroup != "type") return false; 
    if (!filters.sugar[card.sugar].checked && !isAllUnchecked(filters.sugar) && currentGroup != "sugar") return false;
    if (!filters.country[card.country].checked && !isAllUnchecked(filters.country) && currentGroup != "country") return false;
    if (!filters.region[card.region].checked && !isAllUnchecked(filters.region) && currentGroup != "region") return false;
    if (!filters.volume[card.volume].checked && !isAllUnchecked(filters.volume) && currentGroup != "volume") return false;
    return true
  }

  const onDecrease = () => {
    setFilteredCards((prev: TWineCard[]) => [...prev.sort((a, b) => b.price - a.price)]);
  }
  const onIncrease = () => {
    setFilteredCards((prev: TWineCard[]) => [...prev.sort((a, b) => a.price - b.price)]);
  }

  const pathName = usePathname()
  
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterTitle}>Фильтры</div>
       <div className={styles.categoryContainer}>
        {categoryParams.map((index) => (
          <Link
            href={{
              pathname: `/filter/${index.descriptions}`,
            }}
            className={pathName == `/filter/${index.descriptions}` ? styles.categoryActive : styles.category }
            key={index.descriptions}
          >
            {index.title}
          </Link>
        ))}
      </div>
      <div>
        <div>Цена</div>
        <Slider
          value={filters.price.value}
          max={filters.price.max}
          onChange={handleChanges}
          valueLabelDisplay="auto"
        />
        {Math.min(...filters.price.value)}₽ - {Math.max(...filters.price.value)}
        ₽
        <div className={styles.filterBut}>
          <button className={styles.filterButtons} onClick={onDecrease}>По убыванию</button>
          <button className={styles.filterButtons} onClick={onIncrease}>По возрастанию</button>
        </div>
      </div>

      <CheckboxGroup
        counter={counter.type}
        groupTitle={"Тип"}
        data={filters.type}
        onChange={(key: string) => {
          let copy = JSON.parse(JSON.stringify(filters));
          copy.type[key].checked = !copy.type[key].checked;
          setFilters(copy);
        }}
      />
      <CheckboxGroup
        counter={counter.sugar}
        groupTitle={"Сладость"}
        data={filters.sugar}
        onChange={(key: string) => {
          let copy = JSON.parse(JSON.stringify(filters));
          copy.sugar[key].checked = !copy.sugar[key].checked;
          setFilters(copy);
        }}
      />
      <CheckboxGroup
        counter={counter.country}
        groupTitle={"Страна"}
        data={filters.country}
        onChange={(key: string) => {
          let copy = JSON.parse(JSON.stringify(filters));
          copy.country[key].checked = !copy.country[key].checked;
          setFilters(copy);
        }}
      />
      <CheckboxGroup
        counter={counter.region}
        groupTitle={"Регион"}
        data={filters.region}
        onChange={(key: string) => {
          let copy = JSON.parse(JSON.stringify(filters));
          copy.region[key].checked = !copy.region[key].checked;
          setFilters(copy);
        }}
      />
      <CheckboxGroup
        counter={counter.volume}
        groupTitle={"Объем"}
        data={filters.volume}
        onChange={(key: string) => {
          let copy = JSON.parse(JSON.stringify(filters));
          copy.volume[key].checked = !copy.volume[key].checked;
          setFilters(copy);
        }}
      />
    </div>
  );
}
