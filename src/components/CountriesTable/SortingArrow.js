import styles from "./CountriesTable.module.css";
import KeyboardArrowDownRounded from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRounded from "@material-ui/icons/KeyboardArrowUpRounded";

export const SortingArrow = ({ direction }) => {
  if (!direction) {
    return null;
  }

  if (direction === "asc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};
