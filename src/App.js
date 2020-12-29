import React, { useEffect, useState } from "react";
import "./styles.css";

import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { Pokedex } from "../components/Pokedex";
import { getPokemonData, getPokemons } from "../api";
import { FavoriteProvider } from "../context/FavoriteContext";
import { searchPokemon } from "../api";

import egg from "../components/images/huevo.svg";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(0);
  const [favorites, setFavorites] = useState(["bulbasaur"]);
  const [notFound, setNotFound] = useState(false);

  const localStorageKey = " favorite_pokemon";
  const pokemonsLoaded = 12;

  const update_favorite_pokemon = (name) => {
    const newFavorites = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      newFavorites.splice(isFavorite, 1);
    } else {
      newFavorites.push(name);
    }
    setFavorites(newFavorites);
    window.localStorage.setItem(localStorageKey, JSON.stringify(newFavorites));
  };

  const fetch_pokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(pokemonsLoaded, pokemonsLoaded * page);
      const promises = data.results.map(
        async (pokemon) => await getPokemonData(pokemon.url)
      );
      const res = await Promise.all(promises);
      setPokemons(res);
      setLoading(false);
      setTotal(Math.ceil(data.count / pokemonsLoaded));
      setNotFound(false);
    } catch (error) {}
  };

  const loadFavoritePokemons = () => {
    const favoritePokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(favoritePokemons);
  };

  const handleSearchPokemon = async (pokemon) => {
    if (!pokemon) {
      return fetch_pokemons();
    }

    pokemon = pokemon.toLowerCase();

    setLoading(true);
    try {
      const res = await searchPokemon(pokemon);
      if (!res) {
        setNotFound(true);
      } else {
        setPokemons([res]);
        setNotFound(false);
      }
    } catch (error) {
      console.log("no se encontro");
    }
    setLoading(false);
    setPage(0);
    setTotal(1);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    fetch_pokemons();
  }, [page]);

  return (
    <FavoriteProvider
      value={{
        favorite_pokemons: favorites,
        update_favorite_pokemon: update_favorite_pokemon
      }}
    >
      <React.Fragment>
        <div className="App container-fluid">
          <Navbar />

          <SearchBar handleSearchPokemon={handleSearchPokemon} />
          {notFound ? (
            <div className="notFound">
              <img alt="Not Found" width="300px" src={egg} />
            </div>
          ) : (
            <Pokedex
              pokemons={pokemons}
              page={page}
              setPage={setPage}
              total={total}
              loading={loading}
            />
          )}
        </div>
      </React.Fragment>
    </FavoriteProvider>
  );
}
