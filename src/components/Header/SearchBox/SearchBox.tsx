import { useContext } from "react";
import { LocalContext } from "../../../context/localContext";
import styles from "./SearchBox.module.css";

export const SearchBox = () => {
  const localContext = useContext(LocalContext);
  const updateSearch = localContext?.updateSearch;
  const search = localContext?.search;
  const showFavourite = localContext?.showFavourite;

  const handleSearch = (value: string) => {
    if (updateSearch) {
      updateSearch(value);
    }
  };

  return <input className={styles.searchBox} placeholder="Search" value={search} onChange={(e) => handleSearch(e.target.value)} disabled={showFavourite} />;
};
