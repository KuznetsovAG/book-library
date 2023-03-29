import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({ morePage }) => {
  const { loading } = useSelector((state) => state.bookReducer);

  return (
    <div className="paginate">
      {loading === "loading" ? (
        <h2 className="loading__title">Loading....</h2>
      ) : (
        <button className="button__more" onClick={morePage}>
          Learn more
        </button>
      )}
    </div>
  );
};

export default Pagination;
