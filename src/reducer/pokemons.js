import { v1 as uuid } from "uuid"; 

const initialState = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
};

export default function Pokemons(state = initialState, {type, payload}){
    switch(type){
        case 'GET_DATA':
            return {
                ...state,
                pokemon: payload.map(item => { item.id = uuid(); return item}),
            }
        
    }
    return state;
}