import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const CurrentCard = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    singleBook();
  }, [id]);

  const singleBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${id}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log("books :>> ", books);
  return (
    <>
      <div>
        {books.map((book) => (
          <div key={book.id} className="single__book">
            <img
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt="book"
              className="book__img"
            />
            <div className="book__info">
              <p className="categories">{book.volumeInfo.categories}</p>
              <h3 className="title">{book.volumeInfo.title}</h3>
              <p className="authors">{book.volumeInfo.authors}</p>
              <textarea
                name="comment"
                cols="50"
                rows="10"
                className="textarea__book"
              >
                {book.volumeInfo.description}
              </textarea>
              <Link to="/">
                <button className="button__back">
                  Вернкться к списку книг
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CurrentCard;
