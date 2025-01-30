import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonModal } from "../PokemonModal/PokemonModal";
import useAxios from "../../hooks/useAxios";
import { LocalContext } from "../../context/localContext";
import { ListCard } from "./ListCard/ListCard";
import styles from "./Main.module.css";

export type Pokemon = {
  name: string;
  isFavourite: boolean;
  id: number;
};

type Matrix = {
  [key: string]: boolean;
};

export const Main = () => {
  const localContext = useContext(LocalContext);

  const [list, setList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [openPokemon, setOpenPokemon] = useState("");
  const [loadingMatrix, setLoadingMatrix] = useState<Matrix>({});
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayOnlyFavs, setDisplayOnlyFavs] = useState(false);

  const { get, post, remove } = useAxios();

  const searchValue = localContext?.search;
  const showFavourites = localContext?.showFavourite;

  useEffect(() => {
    setList([]);
    setOffset(0);
    setHasMore(false);
    setErrorMessage("");
    setDisplayOnlyFavs(!!showFavourites);
  }, [showFavourites]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchValue!);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    if (!!debouncedTerm) {
      setList([]);
      searchPokemon(debouncedTerm);
    } else {
      setErrorMessage("");
      setIsLoading(false);
      if (!displayOnlyFavs) {
        setList([]);
        fetchPokemons();
      }
    }
  }, [debouncedTerm]);

  useEffect(() => {
    if (displayOnlyFavs) {
      getFavourites();
    } else if (!debouncedTerm) {
      fetchPokemons();
    }
  }, [offset, displayOnlyFavs]);

  const fetchPokemons = async () => {
    try {
      setIsLoading(true);
      const { data } = await get(`/pokemon/?limit=15&offset=${offset}`);
      const nextList = data.results.map((el: { name: string; isFavourite: boolean; id: number }) => ({
        name: el.name,
        isFavourite: el.isFavourite,
        id: el.id,
      }));
      const { next } = data;
      setHasMore(next);
      setList((prev) => {
        const existingNames = new Set(prev.map((item) => item.name));
        const uniqueItems = nextList.filter((item: Pokemon) => !existingNames.has(item.name));
        return [...prev, ...uniqueItems];
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getFavourites = async () => {
    try {
      setIsLoading(true);
      const { data } = await get(`/favourite?limit=15&offset=${offset}`);
      const nextList = data.results.map((el: { name: string; isFavourite: boolean; id: number }) => ({
        name: el.name,
        isFavourite: el.isFavourite,
        id: el.id,
      }));
      const { next } = data;
      setHasMore(next);
      setList((prev) => {
        const existingNames = new Set(prev.map((item) => item.name));
        const uniqueItems = nextList.filter((item: Pokemon) => !existingNames.has(item.name));
        return [...prev, ...uniqueItems];
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const searchPokemon = async (name: string) => {
    try {
      setIsLoading(true);
      const { data } = await get(`/pokemon/search?name=${name}`);
      setList(data);
      setOffset(0);
      setIsLoading(false);
      setHasMore(false);
      setErrorMessage("");
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error?.response?.data?.message);
      console.log(error);
    }
  };

  const setFavouritePokemon = async (name: string, id: number, favourite: boolean) => {
    const updateLoadingMatrix = (status: boolean) => {
      setLoadingMatrix((prev) => ({
        ...prev,
        [name]: status,
      }));
    };

    const updateList = (isFavourite: boolean) => {
      const updatedList = list.map((el) => (el.name === name ? { ...el, isFavourite } : el));
      setList(updatedList);
    };

    try {
      updateLoadingMatrix(true);

      if (!favourite) {
        await post(`/favourite`, { name, id });
        updateList(true);
      } else {
        await remove(`/favourite?name=${name}`);
        updateList(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      updateLoadingMatrix(false);
    }
  };

  if (isLoading && debouncedTerm) return <h4>Searching...</h4>;

  if (isLoading && !list.length) return <h4 className={styles.loading}>Loading...</h4>;

  if (!isLoading && errorMessage) return <h4>{errorMessage ? errorMessage : "something went wrong"}</h4>;

  if (!isLoading && !list.length && showFavourites) return <h4>No favourite pokemon</h4>;

  return (
    <main>
      <InfiniteScroll
        dataLength={list.length}
        next={() => setOffset((prev) => prev + 15)}
        hasMore={hasMore}
        loader={<h4 className={styles.loading}>Loading...</h4>}
      >
        {list.map((el, index) => {
          return (
            <ListCard
              key={index}
              el={el}
              index={index}
              setFavouritePokemon={setFavouritePokemon}
              setOpenPokemon={setOpenPokemon}
              loadingMatrix={loadingMatrix}
            />
          );
        })}
      </InfiniteScroll>

      {openPokemon && <PokemonModal pokemon={openPokemon} onClose={() => setOpenPokemon("")} />}
    </main>
  );
};
