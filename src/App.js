import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="/movie/:id" element={<SingleMovie />}></Route>
    </Routes>
  );
}

export default App;
