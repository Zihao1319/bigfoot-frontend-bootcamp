import React from "react";
import logo from "./logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Outlet />
    </header>
  </div>
);

export default App;
