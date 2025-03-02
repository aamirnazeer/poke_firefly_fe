import { useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { LocalContext } from "./context/localContext";

function App() {
  const [search, setSearch] = useState("");
  const [showFavourite, setShowFavourite] = useState(false);
  const updateSearch = (value: string) => setSearch(value);
  const updateShowFavourite = (value: boolean) => setShowFavourite(value);
  return (
    <div>
      <LocalContext.Provider value={{ search, showFavourite, updateSearch, updateShowFavourite }}>
        <Header />
        <Main />
      </LocalContext.Provider>
    </div>
  );
}

export default App;
