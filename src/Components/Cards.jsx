import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ book }) => {
  console.log("book :>> ", book);

  return (
    <>
      {book.map((item) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;

        return (
          <Link to={`/currentcards/:${item.id}`}>
            <div className="card">
              <img src={thumbnail} alt="" />
              <div className="bottom">
                <p className="categories">{item.volumeInfo.categories}</p>
                <h3 className="title">{item.volumeInfo.title}</h3>
                <p className="authors">{item.volumeInfo.authors}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};
export default Cards;
