import styles from "./index.module.css";

export const ToggleFavourite = () => {
  return (
    <div className={styles.favourite}>
      <label htmlFor="favourite">show favourites only</label>
      <input type="checkbox" id="favourite" />
    </div>
  );
};
