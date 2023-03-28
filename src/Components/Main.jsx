import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearchValue,
  clearBooks,
  fetchBooks,
  setCategoriesValue,
  setSeletValues,
  updateStartIndex,
} from "../reducers/bookReducer";

const Main = () => {
  const [search, setSearch] = useState("");
  const loading = useSelector((state) => state.bookReducer.loading);
  const dispatch = useDispatch();

  const searchBookClick = () => {
    dispatch(clearBooks());
    dispatch(updateStartIndex(0));
    dispatch(fetchBooks());
  };

  const searchBook = (e) => {
    if (e.key === "Enter") {
      return searchBookClick();
    }
  };

  const handleChange = (e) => {
    dispatch(addSearchValue(e.target.value));
    setSearch(e.target.value);
  };

  const handleChangeOption = (e) => {
    dispatch(setSeletValues(e.target.value));
  };

  const handleChangeCategories = (e) => {
    if (e.target.value === "all") {
      return dispatch(setCategoriesValue(""));
    }
    dispatch(setCategoriesValue(e.target.value));
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
            <form className="select__categories">
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

            <form className="select__sorting">
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
    </>
  );
};
export default Main;
