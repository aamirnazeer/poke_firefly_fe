import { SearchBox } from "./SearchBox";
import { ToggleFavourite } from "./ToggleFavourite";

export const Header = () => {
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <SearchBox />
      <ToggleFavourite />
    </header>
  );
};
