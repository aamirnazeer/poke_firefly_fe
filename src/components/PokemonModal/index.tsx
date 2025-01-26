import { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useIdentifier } from "../../hooks/useIdentifier";

export const PokemonModal = ({ pokemon, onClose }: { pokemon: string; onClose: () => void }) => {
  const [pokemonData, setPokemonData] = useState<{ abilities: string[]; types: string[]; evolutions: string[] }>({ abilities: [], types: [], evolutions: [] });
  const [loading, setLoading] = useState(false);

  const userId = useIdentifier();

  useEffect(() => {
    getPokemonDetails(pokemon);
  }, []);

  const getPokemonDetails = async (name: string) => {
    setLoading(true);
    const { data } = await axios.get(`http://localhost:5000/pokemon/${name}`, { headers: { "user-id": userId } });
    setLoading(false);
    setPokemonData(data.data);
  };

  if (!pokemon) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.modalClose} onClick={onClose}>
          ✖
        </button>
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            <h1>{pokemon}</h1>
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
            <div>
              <p>
                <strong>Evolutions:</strong> {pokemonData.evolutions.join(", ")}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
