import { v1 as uuid } from "uuid"; 

const initialState = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    pokemonBlock: {
        pokeName: 'Bulbasaur',
        pokeImg: "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/1.png?raw=true",
        pokeUrl: "https://pokeapi.co/api/v2/pokemon/1/",
        pokeIndex: "1",
    }
};

export default function Pokemons(state = initialState, {type, payload}){
    switch(type){
        case 'GET_DATA':
            return {
                ...state,
                pokemon: payload.map(item => { item.id = uuid(); return item}),
            }
        case 'POKEMON_DEV_INF':
            return {
                ...state,
                pokemonBlock: payload,
            }
    }
    return state;
}