import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "@reach/router"
import ScoreLanding from "./pages/Scores/ScoreLanding"

const App = () => (
  <div className="App">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />


    {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        React.
      </p>
    </header> */}
    <ScoreLanding />
  </div>
);

export default App;
