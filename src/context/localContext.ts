import { createContext } from "react";

type LocalContextType = {
  search: string;
  showFavourite: boolean;
  updateSearch: (arg0: string) => void;
  updateShowFavourite: (arg0: boolean) => void;
};

export const LocalContext = createContext<LocalContextType | undefined>(undefined);
