import React from 'react';
// import ScoreLanding from './pages/Scores/ScoreLanding';
import { Pokemon } from './pages/Pokemon';
import './App.scss';

const App = (): JSX.Element => (
  <div className="App">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />

    {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        React.
      </p>
    </header> */}
    <Pokemon />
    {/* <ScoreLanding /> */}
  </div>
);

export default App;
