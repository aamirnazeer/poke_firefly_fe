import { v4 as uuidv4 } from "uuid";

export const useIdentifier = () => {
  if (localStorage.getItem("poke_firefly_fe_uuid")) {
    return localStorage.getItem("poke_firefly_fe_uuid");
  } else {
    const uuid = uuidv4();
    localStorage.setItem("poke_firefly_fe_uuid", uuid);
    return uuid;
  }
};
