import react, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";

const Main = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const [categories, setCategories] = useState("");
  const [selectValue, setSeletValue] = useState({ value: "relevance" });

  const searchBook = (e) => {
    if (e.key === "Enter") {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}${
            categories.length > 0 ? `+subject:${categories}` : ""
          }&orderBy=${
            selectValue.value
          }&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU
            &maxResults=30`
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };

  const searchBookClick = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}${
          categories.length > 0 ? `+subject:${categories}` : ""
        }&orderBy=${
          selectValue.value
        }&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU
            &maxResults=30`
      )
      .then((res) => setData(res.data.items))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeOption = (e) => {
    setSeletValue({ value: e.target.value });
  };

  const handleChangeCategories = (e) => {
    setCategories(e.target.value);
  };

  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>
            A room without books is like
            <br /> a body without a soul.
          </h1>
        </div>
        <div className="row2">
          <h2>Find Your Book</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={handleChange}
              onKeyPress={searchBook}
            />
            <button>
              <i className="fas fa-search" onClick={searchBookClick}></i>
            </button>
          </div>
          <div className="select">
            <form>
              <label>
                Categories:
                <select onChange={handleChangeCategories}>
                  <option value="all">all</option>
                  <option value="art">art</option>
                  <option value="biography">biography</option>
                  <option value="computers">computers</option>
                  <option value="history">history</option>
                  <option value="medical">medical</option>
                  <option value="poetry">poetry</option>
                </select>
              </label>
            </form>

            <form>
              <label>
                Sorting by:
                <select onChange={handleChangeOption}>
                  <option value="relevance">relevance</option>
                  <option value="newest">newest</option>
                </select>
              </label>
            </form>
          </div>
        </div>
      </div>

      <div className="card__title">Fount: {bookData.length} results</div>

      <div className="container">{<Cards book={bookData} />}</div>
      {bookData.length > 0 && (
        <div className="paginate">
          <button className="button__more">Learn more</button>
        </div>
      )}
    </>
  );
};
export default Main;
