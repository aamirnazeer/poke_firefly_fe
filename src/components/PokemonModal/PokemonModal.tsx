import { useEffect, useState } from "react";
import styles from "./PokemonModal.module.css";
import useAxios from "../../hooks/useAxios";

export const PokemonModal = ({ pokemon, onClose }: { pokemon: string; onClose: () => void }) => {
  const [pokemonData, setPokemonData] = useState<{
    abilities: string[];
    types: string[];
    evolutions: string[];
    id: number;
  }>({ abilities: [], types: [], evolutions: [], id: 0 });
  const [loading, setLoading] = useState(false);

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
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
              width={200}
              height={200}
            />
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
