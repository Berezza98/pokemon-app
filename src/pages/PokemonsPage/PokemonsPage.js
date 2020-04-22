import React, { Component } from 'react';
import './PokemonsPage.css';
import RandomPokemon from '../../components/RandomPokemon';
import PokemonList from '../../components/PokemonList';
import ErrorIndicator from '../../components/ErrorIndicator';
import SelectedPokemon from '../../components/SelectedPokemon';

class PokemonsPage extends Component {
    state = {
        hasError: false,
        selectedPokemon: null
    };

    changeSelectedPokemon = (name) => {
        this.setState(state => {
            return {
                ...this.state,
                selectedPokemon: name
            };
        });
    };

    componentDidCatch(error) {
        this.setState(state => {
            return {
                hasError: true
            };
        });
    }

    render() {
        const { hasError, selectedPokemon } = this.state;

        if (hasError) {
            return <ErrorIndicator />
        }

        return (
            <div className="pokemons-page">
                <RandomPokemon />
                <div className="pokemon-wrapper">
                    <div className="pokemon-list-wrapper">
                        <PokemonList changeSelectedPokemon={this.changeSelectedPokemon} />
                    </div>
                    <div className="selected-pokemon-wrapper">
                        <SelectedPokemon pokemonName={selectedPokemon}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default PokemonsPage;