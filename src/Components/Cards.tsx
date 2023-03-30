import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchBooks, updateStartIndex } from "../reducers/bookReducer";
import Pagination from "./Pagination";

const Cards:FC = () => {
  const books = useAppSelector((state) => state.bookReducer.books);
  const total = useAppSelector((state) => state.bookReducer.total);
  const loading = useAppSelector((state) => state.bookReducer.loading);
  const startIndexBook = useAppSelector((state) => state.bookReducer.startIndex);
  const error = useAppSelector((state) => state.bookReducer.hasError)
  const dispatch = useAppDispatch();

  const morePage = () => {
    dispatch(updateStartIndex(startIndexBook + 30));
    dispatch(fetchBooks());
  };

  if (error) {
    return <h2 className="loading__title">Unable to find book, server error</h2>
  }


  if (!books || !books.length) {
    return loading === "loading" ? (
      <h2 className="loading__title">Loading....</h2>
    ) : (
      <h2 className="book__title">Введите название книги</h2>
    );
  }
  console.log("books :>> ", books);
  return (
    <div className="main__card">
      <div className="total__title">Fount: {total} results</div>
      <div className="container">
        {books.map((item) => {
          let thumbnail =
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail;

          return (
            <div key={item.id}>
              
                <div className="card">
                <Link to={`/currentcards/${item.id}`}>
                  <img src={thumbnail} alt="" />
                  </Link>
                  <div className="bottom">
                    <p className="categories">{item.volumeInfo.categories}</p>
                    <h3 className="title">{item.volumeInfo.title}</h3>
                    <p className="authors">{item.volumeInfo.authors}</p>
                  </div>
                </div>
              
            </div>
          );
        })}
      </div>
      <Pagination morePage={morePage} />
    </div>
  );
};
export default Cards;
