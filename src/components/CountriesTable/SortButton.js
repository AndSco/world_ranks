import styles from "./CountriesTable.module.css";
import { SortingArrow } from "./SortingArrow";

export const SortButton = ({
  value,
  setValueAndDirection,
  selectedValue,
  sortDirection
}) => {
  return (
    <button
      className={styles.buttons_common}
      style={{ justifyContent: value === "name" ? "flex-start" : "inherit" }}
      onClick={() => setValueAndDirection(value)}
    >
      <div>{value[0].toUpperCase() + value.slice(1)}</div>
      {selectedValue === value && <SortingArrow direction={sortDirection} />}
    </button>
  );
};
