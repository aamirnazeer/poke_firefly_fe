import { useContext } from "react";
import { LocalContext } from "../../../context/localContext";

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

  return (
    <>
      <input placeholder="search for pokemon" value={search} onChange={(e) => handleSearch(e.target.value)} disabled={showFavourite} />
    </>
  );
};
