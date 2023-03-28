import React from "react";

const Pagination = ({ morePage }) => {
  return (
    <div className="paginate">
      <button className="button__more" onClick={morePage}>
        Learn more
      </button>
    </div>
  );
};

export default Pagination;
