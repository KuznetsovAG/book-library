import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, updateStartIndex } from "../reducers/bookReducer";
import Pagination from "./Pagination";

const Cards = () => {
  const books = useSelector((state) => state.bookReducer.books);
  const total = useSelector((state) => state.bookReducer.total);
  const loading = useSelector((state) => state.bookReducer.loading);
  const startIndexBook = useSelector((state) => state.bookReducer.startIndex);
  const dispatch = useDispatch();

  const morePage = () => {
    dispatch(updateStartIndex(startIndexBook + 30));
    dispatch(fetchBooks());
  };

  if (!books || !books.length) {
    return loading === "loading" ? (
      <h2 className="loading__title">Loading....</h2>
    ) : (
      <h2 className="book__title">Введите название книги</h2>
    );
  }

  return (
    <div className="main__card">
      <div className="total__title">Fount: {total} results</div>
      <div className="container">
        {books.map((item) => {
          let thumbnail =
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail;

          return (
            <div>
              <Link to={`/currentcards/${item.id}`} key={item.id}>
                <div className="card">
                  <img src={thumbnail} alt="" />
                  <div className="bottom">
                    <p className="categories">{item.volumeInfo.categories}</p>
                    <h3 className="title">{item.volumeInfo.title}</h3>
                    <p className="authors">{item.volumeInfo.authors}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination morePage={morePage} />
    </div>
  );
};
export default Cards;
