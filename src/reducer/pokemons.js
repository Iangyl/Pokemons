const initialState = {};

export default function Pokemons(state = initialState, {type, payload}){
    switch(type){
        case 'GET_DATA': {
            return {
                ...state,
                items: payload,
            }
        }
    }
    return state;
}