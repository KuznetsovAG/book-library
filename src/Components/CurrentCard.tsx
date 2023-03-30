import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { foundBooks } from "../reducers/bookReducer";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const CurrentCard: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) => state.bookReducer.foundBooks);
  const error = useAppSelector((state) => state.bookReducer.hasError)
  useEffect(() => {
    dispatch(foundBooks(id));
  }, [id]);

  if (!book || error) {
    return error ? <h2 className="loading__title">Book not found, server error</h2> : <h2 className="loading__title">Loading....</h2>;
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
      ) }
      
    </>
  );
};

export default CurrentCard;
