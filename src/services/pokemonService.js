export default class PokemonService {
    _baseUrl = 'https://pokeapi.co/api/v2';

    getResources = async (url) => {
        const response = await fetch(`${this._baseUrl}${url}`);
        if (!response.ok) {
            throw new Error('Error in request');
        }

        const body = await response.json();
        return body;
    }

    getAllPokemons = async (limit= 50) => {
        const { next, previous, results } = await this.getResources(`/pokemon?limit=${limit}`);
        return {
            next,
            prev: previous,
            pokemons: results
        };
    }

    getPokemon = async (id = Math.floor(Math.random() * 100) + 1) => {
        const { name, sprites: { front_default } } = await this.getResources(`/pokemon/${id}`);
        return {
            pokemon: {
                name,
                imageUrl: front_default
            }
        };
    }
}