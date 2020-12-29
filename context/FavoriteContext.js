import React from "react";

const FavoriteContext = React.createContext({
  favorite_pokemons: [],
  update_favorite_pokemon: (id) => null
});

export const FavoriteProvider = FavoriteContext.Provider;
export default FavoriteContext;
