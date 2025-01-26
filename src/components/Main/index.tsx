import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonModal } from "../PokemonModal";
import useAxios from "../../hooks/useAxios";
import { LocalContext } from "../../context/localContext";

type Pokemon = {
  name: string;
  isFavourite: boolean;
};

type Matrix = {
  [key: string]: boolean;
};

export const Main = () => {
  const [list, setList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [openPokemon, setOpenPokemon] = useState("");
  const [loadingMatrix, setLoadingMatrix] = useState<Matrix>({});
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { get, post, remove } = useAxios();
  const localContext = useContext(LocalContext);

  const searchValue = localContext?.search;
  const showFavourites = localContext?.showFavourite;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchValue!);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    if (debouncedTerm) {
      searchPokemon(debouncedTerm);
    } else {
      setErrorMessage("");
      setList([]);
      fetchPokemons();
    }
  }, [debouncedTerm]);

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

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

  const setFavouritePokeon = async (name: string, favourite: boolean) => {
    try {
      setLoadingMatrix((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
      if (!favourite) {
        await post(`/favourite`, { name });
        const updatedList = list.map((el) => (el.name === name ? { ...el, isFavourite: true } : el));
        setList(updatedList);
      } else {
        await remove(`/favourite?name=${name}`);
        const updatedList = list.map((el) => (el.name === name ? { ...el, isFavourite: false } : el));
        setList(updatedList);
      }

      setLoadingMatrix((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    } catch (err) {
      setLoadingMatrix((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
      console.log(err);
    }
  };

  const fetchPokemons = async () => {
    try {
      setIsLoading(true);
      const { data } = await get(`/pokemon/?limit=15&offset=${offset}`);
      const nextList = data.results.map((el: { name: string; isFavourite: boolean }) => ({
        name: el.name,
        isFavourite: el.isFavourite,
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

  if (isLoading && debouncedTerm) return <h4>Searching...</h4>;

  if (!isLoading && errorMessage) return <h4>{errorMessage ? errorMessage : "something went wrong"}</h4>;

  return (
    <main>
      <InfiniteScroll
        dataLength={list.length}
        next={() => setOffset((prev) => prev + 15)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more items to load</p>}
      >
        {list.map((el, index) => {
          return (
            <div
              key={index}
              style={{
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "48px",
              }}
            >
              <a onClick={() => setOpenPokemon(el.name)} style={{ cursor: "pointer" }}>
                <span>
                  {index + 1}: {el.name}
                </span>
              </a>

              <button
                onClick={() => setFavouritePokeon(el.name, el.isFavourite)}
                style={{
                  backgroundColor: el.isFavourite ? "#ffd700" : "#f0f0f0",
                  border: "none",
                  height: "32px",
                  width: "32px",
                  cursor: loadingMatrix[el.name] ? "wait" : "pointer",
                }}
                disabled={loadingMatrix[el.name]}
              >
                <span style={{ fontSize: "16px" }}>{el.isFavourite ? "★" : "☆"}</span>
              </button>
            </div>
          );
        })}
      </InfiniteScroll>

      {openPokemon && <PokemonModal pokemon={openPokemon} onClose={() => setOpenPokemon("")} />}
    </main>
  );
};
