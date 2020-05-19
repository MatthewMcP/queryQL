import React from 'react';
import { Pokemon } from './pages/Pokemon';

const App = (): JSX.Element => (
  <div className="App">
    <div className="w-full bg-gray-800">
      <Pokemon />
    </div>
  </div>
);

export default App;
