import React, { Component } from 'react';
import './RandomPokemon.css';

import PokemonService from '../../services/pokemonService';
import Spinner from '../Spinner/Spinner';

export default class RandomPokemon extends Component {
    api = new PokemonService();
    state = {
        pokemon: {},
        loaded: false
    }

    constructor() {
        super();
        this.updatePokemon();
    }

    async updatePokemon() {
        const result = await this.api.getPokemon();
        this.setState((state) => {
            return {
                ...state,
                ...result,
                loaded: true
            };
        });
    }

    

    render() {
        const { pokemon, loaded } = this.state;

        const spinner = !loaded ? <Spinner /> : null;
        const pokemonView = loaded ? <PokemonView pokemon={pokemon} /> : null;

        return (
            <div className="random-pokemon-wrapper">
                { spinner }
                { pokemonView }
            </div>
        );
    };
};

const PokemonView = ({ pokemon }) => {
    const { name, imageUrl } = pokemon;
    return (
        <React.Fragment>
            <h2 className="pokemon-name">{ name }</h2>
            <img src={imageUrl} alt={name} />
        </React.Fragment>
    );
};