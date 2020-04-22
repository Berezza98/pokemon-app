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

    componentDidMount() {
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

    selectPokemon = (name) => {
        this.props.changeSelectedPokemon(name);
    }

    render() {
        const { next, prev, pokemons } = this.state;
        return (
            <div>
                <ul className="pokemon-list">
                    {
                        pokemons.map(pokemon => <li onClick={() => this.selectPokemon(pokemon.name)} key={pokemon.name}>{ pokemon.name }</li>)
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