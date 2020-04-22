import React, { Component } from 'react';
import './RandomPokemon.css';

import PokemonService from '../../services/pokemonService';
import Spinner from '../Spinner/Spinner';
import ErrorIndicator from '../ErrorIndicator';

export default class RandomPokemon extends Component {
    api = new PokemonService();
    state = {
        pokemon: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updatePokemon();
    }

    async updatePokemon() {
        try {
            const result = await this.api.getPokemon();
            this.setState((state) => {
                return {
                    ...state,
                    pokemon: result,
                    loading: false
                };
            });
        } catch {
            this.setState((state) => {
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            });
        }
    }

    

    render() {
        const { pokemon, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorIndicator = error ? <ErrorIndicator /> : null
        const spinner = loading ? <Spinner /> : null;
        const pokemonView = hasData ? <PokemonView pokemon={pokemon} /> : null;

        return (
            <div className="random-pokemon-wrapper">
                { errorIndicator }
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