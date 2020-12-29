import React, { Fragment } from "react";

export const Pagination = (props) => {
  const { handle_prev, handle_next, page, total_pages } = props;

  return (
    <React.Fragment>
      <div className="pagination">
        <button className="pokemon-btn btn-pagination">
          <div onClick={handle_prev}> {"<"} </div>
        </button>
        <div className="pages">
          {page} de {total_pages}
        </div>
        <button className="pokemon-btn btn-pagination">
          <div onClick={handle_next}> {">"} </div>
        </button>
      </div>
    </React.Fragment>
  );
};
