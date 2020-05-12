const initialState = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
};

export default function Pokemons(state = initialState, {type, payload}){
    switch(type){
        case 'GET_DATA': {
            return {
                ...state,
                pokemon: payload,
            }
        }
    }
    return state;
}