import React from "react";

import { PokemonCard } from "../components/PokemonCard";
import { Pagination } from "../components/Pagination";
import { Loading } from "./Loading";

import snorlax from "./images/snorlax.svg";

export const Pokedex = (props) => {
  const { pokemons, page, setPage, total, loading } = props;

  const last_page = () => {
    const next_page = Math.max(page, 1);
    setPage(next_page - 1);
  };

  const next_page = () => {
    const next_page = Math.min(page, total - 1);
    setPage(next_page + 1);
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="spinner">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="row">
            {pokemons.map((pokemon, idx) => (
              <div className="col-12 col-sm-6  col-md-4" key={idx}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="header">
        <div> </div>
        <Pagination
          page={page + 1}
          total_pages={total}
          handle_prev={last_page}
          handle_next={next_page}
        />
      </div>
    </React.Fragment>
  );
};
