import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Calculation from "./pages/Calculation";
import ErrorDetection from "./pages/ErrorDetection";
import Orientation from "./pages/Orientation";
import WordsCategories from "./pages/WordsCategories";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error-detection" element={<ErrorDetection />} />
        <Route path="/calculation" element={<Calculation />} />
        <Route path="/orientation" element={<Orientation />} />
        <Route path="/words-categories" element={<WordsCategories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
