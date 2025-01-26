import { SearchBox } from "./SearchBox";
import { ToggleFavourite } from "./ToggleFavourite";
import styles from "./index.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <SearchBox />
      <ToggleFavourite />
    </header>
  );
};
