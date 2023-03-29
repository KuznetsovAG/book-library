import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { foundBooks } from "../reducers/bookReducer";

const CurrentCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.bookReducer.foundBooks);
  const loading = useSelector((state) => state.bookReducer.loading);
  useEffect(() => {
    dispatch(foundBooks(id));
  }, [id]);

  if (!book) {
    return <h2 className="loading__title">Loading....</h2>;
  }

  return (
    <>
      {book && (
        <div className="single__book">
          <img
            src={
              book.volumeInfo.imageLinks &&
              book.volumeInfo.imageLinks.smallThumbnail
            }
            alt="book"
            className="book__img"
          />
          <div className="book__info">
            <p className="categories">{book.volumeInfo.categories}</p>
            <h3 className="title">{book.volumeInfo.title}</h3>
            <p className="authors">{book.volumeInfo.authors}</p>
            <div className="description__book">
              {book.volumeInfo.description}
            </div>
            <Link to="/">
              <button className="button__back">Вернуться к списку книг</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentCard;
