import React from "react";

const Pagination = ({ booksPerPage, totalBook, morePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBook / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginate">
      <button className="button__more" onClick={morePage}>
        Learn more
      </button>
    </div>
  );
};

export default Pagination;
