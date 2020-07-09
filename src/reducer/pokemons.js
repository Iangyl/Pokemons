import { v1 as uuid } from "uuid"; 

const initialState = {
    url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=984',//offset - с какого эл-та начинается список, limit - кол-во э-тов в списке
    pokemonBlock: {
        pokeName: 'Bulbasaur',
        pokeImg: "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/1.png?raw=true",
        pokeUrl: "https://pokeapi.co/api/v2/pokemon/1/",
        pokeIndex: "1",
    },
    searchWord: '',
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
        case 'GET_SEARCH_STRING':
            return {
                ...state,
                searchWord: payload,
            }
    }
    return state;
}