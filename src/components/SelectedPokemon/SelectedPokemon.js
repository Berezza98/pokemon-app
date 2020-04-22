import React, { Component } from 'react';
import './SelectedPokemon.css';

import PokemonService from '../../services/pokemonService';
import Spinner from '../Spinner/Spinner';

class SelectedPokemon extends Component {
    api = new PokemonService();

    state = {
        pokemon: null,
        loaded: true
    };

    async componentDidUpdate(prevProps) {
        const { pokemonName } = this.props;
        if (prevProps.pokemonName !== this.props.pokemonName) {
            this.updatePokemon(pokemonName);
        }
    }

    updatePokemon = async (pokemonName) => {
        this.setState(state => ({ ...state, loaded: false }));
        const result = await this.api.getPokemon(pokemonName);
        this.setState(state => {
            return {
                ...state,
                pokemon: result,
                loaded: true
            };
        });
    }

    render() {
        const { pokemon, loaded } = this.state;
        const pokemonView = (pokemon && loaded) ? <PokemonView  pokemon={pokemon} /> : null;
        const errorView = !pokemon ? <ErrorView /> : null;
        const loading = !loaded ? <Spinner /> : null;

        return (
            <div className="selected-pokemon">
                { pokemonView }
                { errorView }
                { loading }
            </div>
        );
    }
};

const PokemonView = ({ pokemon }) => {
    const { name, imageUrl } = pokemon;
    return (
        <React.Fragment>
            <h2 className="pokemon-name">{ name }</h2>
            <img src={imageUrl} alt={name} />
        </React.Fragment>
    );
}

const ErrorView = () => {
    return (
        <div className="error-view">
            <h2>Please select Pokemon</h2>
        </div>
    );
}

export default SelectedPokemon;