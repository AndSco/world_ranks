import { useState } from "react";
import styles from "./CountriesTable.module.css";
import { SortButton } from "./SortButton";
import Link from "next/link";
import { CustomLink } from "../CustomLink";

const orderBy = (param, direction, countries) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[param] > b[param] ? 1 : -1));
  } else if (direction === "desc") {
    return [...countries].sort((a, b) => (a[param] > b[param] ? -1 : 1));
  }
  return countries;
};

export const CountriesTable = ({ countries }) => {
  const [sortDirection, setSortDirection] = useState();
  const [sortValue, setSortValue] = useState();

  const orderedCountries = orderBy(sortValue, sortDirection, countries);

  const switchDirection = () => {
    if (!sortDirection) {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortDirection("asc");
    } else {
      setSortDirection(null);
    }
  };

  const setValueAndDirection = value => {
    switchDirection();
    setSortValue(value);
  };

  return (
    <section>
      <div className={styles.heading}>
        <SortButton
          value="name"
          setValueAndDirection={setValueAndDirection}
          selectedValue={sortValue}
          sortDirection={sortDirection}
        />

        <SortButton
          value="population"
          setValueAndDirection={setValueAndDirection}
          selectedValue={sortValue}
          sortDirection={sortDirection}
        />
      </div>
      {orderedCountries.map(country => (
        <CustomLink href={`/country/${country.alpha3Code}`} key={country.name}>
          <article className={styles.row}>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
          </article>
        </CustomLink>
      ))}
    </section>
  );
};
