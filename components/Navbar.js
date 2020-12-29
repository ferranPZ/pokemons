import React, { useContext } from "react";
import FavoriteContext from "../context/FavoriteContext";
import pokeball from "./images/pballColor.png";
import logo from "./images/logo.png";

export const Navbar = () => {
  const { favorite_pokemons } = useContext(FavoriteContext);

  return (
    <nav>
      <div>
        <img alt="logo" src={logo} className="navbar-logo"></img>
      </div>
      <div className="pokemon-favorite">
        <img src={pokeball} />
        {favorite_pokemons.length}
      </div>
    </nav>
  );
};
