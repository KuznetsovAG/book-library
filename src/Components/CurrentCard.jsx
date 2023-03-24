import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const CurrentCard = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  console.log("id :>> ", id);
  useEffect(() => {
    singleBook();
  }, []);

  const singleBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );

      setBooks([...books, response.data]);
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
              <textarea
                name="comment"
                cols="50"
                rows="10"
                value={""}
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
