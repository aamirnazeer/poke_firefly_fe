import { useEffect, useState } from "react";
import styles from "./PokemonModal.module.css";
import useAxios from "../../hooks/useAxios";
import { capitalizeFirstChar } from "../../utils/capitalizeFirstChar";
import { ARTWORK_ENDPOINT } from "../../core/env";

export const PokemonModal = ({ pokemon, onClose }: { pokemon: string; onClose: () => void }) => {
  const [pokemonData, setPokemonData] = useState<{
    abilities: string[];
    types: string[];
    evolutions: string[];
    id: 0;
  }>({ abilities: [], types: [], evolutions: [], id: 0 });
  const [loading, setLoading] = useState(true);

  const { get } = useAxios();

  useEffect(() => {
    getPokemonDetails(pokemon);
  }, []);

  const getPokemonDetails = async (name: string) => {
    setLoading(true);
    const { data } = await get(`/pokemon/${name}`);
    setLoading(false);
    setPokemonData(data);
  };

  const closeHandler = () => {
    setPokemonData({ abilities: [], types: [], evolutions: [], id: 0 });
    onClose();
  };

  if (!pokemon) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.modalClose} onClick={closeHandler}>
          ✖
        </button>
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            <img src={ARTWORK_ENDPOINT.replace("_id_", pokemonData.id.toString())} width={200} height={200} />
            <h1>{capitalizeFirstChar(pokemon)}</h1>
            <div>
              <p>
                <strong>Abilities</strong>: {pokemonData.abilities.join(", ")}
              </p>
            </div>
            <div>
              <p>
                <strong>Types:</strong> {pokemonData.types.join(", ")}
              </p>
            </div>
            {pokemonData.abilities.length && (
              <div>
                <p>
                  <strong>Evolutions:</strong> {pokemonData.evolutions.join(", ")}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
