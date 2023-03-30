import React, { FC } from "react";
import { useAppSelector } from "../hooks/hooks";


interface PaginationProps {
  morePage: () => void
}

const Pagination:FC<PaginationProps> = ({ morePage }) => {
  const { loading } = useAppSelector((state) => state.bookReducer);

  return (
    <div className="paginate">
      {loading === "loading" ? (
        <h2 className="loading__title">Loading....</h2>
      ) : (
        <button className="button__more" onClick={morePage}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Pagination;
