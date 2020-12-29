import React, { useState } from "react";

export const SearchBar = (props) => {
  const { handleSearchPokemon } = props;
  let [search, setSearch] = useState("");

  const handle_search = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      handleSearchPokemon(null);
    }
  };

  const onClick = () => {
    handleSearchPokemon(search);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearchPokemon(search);
    }
  };

  return (
    <React.Fragment>
      <div className="searchbar-container">
        <div className="row">
          <div className="col-12 col-md-6 searchbar">
            <input
              onKeyUp={handleKeyUp}
              placeholder="Buscar Pokemon"
              onChange={handle_search}
            />
          </div>
          <div className="col-12 col-md-6 searchbar-btn">
            <div>
              <button onClick={onClick}>
                <span role="img" aria-label="buscar">
                  🔍
                </span>
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
