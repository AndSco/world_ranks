import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "./SearchInput.module.css";

export const SearchInput = ({ ...rest }) => {
  return (
    <section className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input className={styles.input} type="text" {...rest} />
    </section>
  );
};
