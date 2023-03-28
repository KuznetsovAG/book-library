import React from "react";
import { Route, Routes } from "react-router-dom";
import Cards from "./Components/Cards";
import CurrentCard from "./Components/CurrentCard";
import Main from "./Components/Main";
import "./Components/style.css";
function App() {
  return (
    <>
      <Main />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/currentcards/:id" element={<CurrentCard />} />
      </Routes>
    </>
  );
}

export default App;
