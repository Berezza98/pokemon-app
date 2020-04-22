import React from 'react';
import './App.css';

import Header from '../Header';
import PokemonsPage from '../../pages/PokemonsPage';

function App() {
  return (
    <div className="App">
      <Header />
      <PokemonsPage />
    </div>
  );
}

export default App;
