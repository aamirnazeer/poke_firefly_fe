import { Pokemon } from "../Main";
import styles from "./ListCard.module.css";

type ListCardPropTypes = {
  el: Pokemon;
  index: number;
  setFavouritePokemon: (name: string, favourite: boolean) => Promise<void>;
  loadingMatrix: Record<string, boolean>;
  setOpenPokemon: React.Dispatch<React.SetStateAction<string>>;
};

export const ListCard: React.FC<ListCardPropTypes> = ({ index, el, setFavouritePokemon, setOpenPokemon, loadingMatrix }) => {
  return (
    <div key={index} className={styles.listCard}>
      <a onClick={() => setOpenPokemon(el.name)}>
        <span>
          {index + 1}: {el.name}
        </span>
      </a>

      <button
        onClick={() => setFavouritePokemon(el.name, el.isFavourite)}
        style={{
          backgroundColor: el.isFavourite ? "#ffd700" : "#f0f0f0",
          cursor: loadingMatrix[el.name] ? "wait" : "pointer",
        }}
        disabled={loadingMatrix[el.name]}
      >
        <span style={{ fontSize: "16px" }}>{el.isFavourite ? "★" : "☆"}</span>
      </button>
    </div>
  );
};
