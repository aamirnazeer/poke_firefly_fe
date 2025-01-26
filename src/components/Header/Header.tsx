import { SearchBox } from "./SearchBox/SearchBox";
import { ToggleFavourite } from "./ToggleFavourite/ToggleFavourite";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <SearchBox />
      <ToggleFavourite />
    </header>
  );
};
