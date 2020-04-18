import React, { Component } from 'react';
import './PokemonList.css';

import PokemonService from '../../services/pokemonService';

export default class PokemonList extends Component {
    api = new PokemonService();
    state = {
        next: null,
        prev: null,
        pokemons: []
    };

    constructor() {
        super();
        this.updatePokemonList();
    }

    async updatePokemonList() {
        const result = await this.api.getAllPokemons();
        this.setState((state) => {
            return {
                ...state,
                ...result
            };
        });
    }

    render() {
        const { next, prev, pokemons } = this.state;
        return (
            <div className="pokemon-list-wrapper">
                <ul className="pokemon-list">
                    {
                        pokemons.map(pokemon => <li key={pokemon.name}>{ pokemon.name }</li>)
                    }
                </ul>
                <div className="pagination">
                    <button disabled={!prev}>Prev</button>
                    <button disabled={!next}>Next</button>
                </div>
            </div>
        )
    }

}