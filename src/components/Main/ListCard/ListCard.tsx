import { SPRITE_ENDPOINT } from "../../../core/env";
import { capitalizeFirstChar } from "../../../utils/capitalizeFirstChar";
import { Pokemon } from "../Main";
import styles from "./ListCard.module.css";

type ListCardPropTypes = {
  el: Pokemon;
  index: number;
  setFavouritePokemon: (name: string, id: number, favourite: boolean) => Promise<void>;
  loadingMatrix: Record<string, boolean>;
  setOpenPokemon: React.Dispatch<React.SetStateAction<string>>;
};

export const ListCard: React.FC<ListCardPropTypes> = ({ index, el, setFavouritePokemon, setOpenPokemon, loadingMatrix }) => {
  return (
    <div key={index} className={styles.listCard}>
      <a onClick={() => setOpenPokemon(el.name)} style={{ display: "flex", alignItems: "center" }}>
        <span>
          {index + 1}: {capitalizeFirstChar(el.name)}
        </span>
        <img src={SPRITE_ENDPOINT.replace("_id_", el.id.toString())} height={70} />
      </a>

      <button
        onClick={() => setFavouritePokemon(el.name, el.id, el.isFavourite)}
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
