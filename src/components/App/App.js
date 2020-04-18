import React from 'react';
import './App.css';

import Header from '../Header';
import RandomPokemon from '../RandomPokemon';
import PokemonList from '../PokemonList';

function App() {
  return (
    <div className="App">
      <Header />
      <RandomPokemon />
      <PokemonList />
    </div>
  );
}

export default App;
