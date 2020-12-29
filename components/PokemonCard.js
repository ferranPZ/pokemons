import React, { useContext } from "react";
import FavoriteContext from "../context/FavoriteContext";
import pokeballBlack from "./images/pball.png";
import pokeballColor from "./images/pballColor.png";

export const PokemonCard = (props) => {
  const { pokemon } = props;
  const { favorite_pokemons, update_favorite_pokemon } = useContext(
    FavoriteContext
  );
  const pokeball = favorite_pokemons.includes(pokemon.name)
    ? pokeballColor
    : pokeballBlack;

  const handle_like = (e) => {
    e.preventDefault();
    update_favorite_pokemon(pokemon.name);
  };
  const type = pokemon.types[0].type.name;
  return (
    <React.Fragment>
      <div className="card">
        <div className={`${type}`}>
          <img
            className="pokemon-img"
            alt={pokemon.name}
            src={pokemon.sprites.front_default}
          />
        </div>
        <div className="card-body">
          <div className="card-top">
            <h4 className="card-title">{pokemon.name}</h4>
            <div className="pokemon-id">#{pokemon.id}</div>
          </div>
          <div className="card-bottom">
            <div className="card-text pokemon-type">
              {pokemon.types.map((type, idx) => {
                return (
                  <div className="pokemon-type-text" key={idx}>
                    {type.type.name}
                  </div>
                );
              })}
            </div>
            <button className="pokemon-btn" onClick={handle_like}>
              <div className="pokemon-favorite">
                <img alt="favorites" src={pokeball} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
