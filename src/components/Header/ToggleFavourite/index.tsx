import { useContext } from "react";
import styles from "./index.module.css";
import { LocalContext } from "../../../context/localContext";

export const ToggleFavourite = () => {
  const localContext = useContext(LocalContext);
  const updateShowFavourite = localContext?.updateShowFavourite;
  const updateSearch = localContext?.updateSearch;

  const handleFavourite = (value: boolean) => {
    if (updateShowFavourite && updateSearch) {
      updateShowFavourite(value);
      updateSearch("");
    }
  };

  return (
    <div className={styles.favourite}>
      <label htmlFor="favourite">show favourites only</label>
      <input type="checkbox" id="favourite" onChange={(event) => handleFavourite(event.target.checked)} />
    </div>
  );
};
