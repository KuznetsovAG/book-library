import React from "react";
import { Route, Routes } from "react-router-dom";
import CurrentCard from "./Components/CurrentCard";
import Main from "./Components/Main";
import "./Components/style.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/currentcards/:id" element={<CurrentCard />} />
      </Routes>
    </>
  );
}

export default App;
