const initialState = {
    types: ['grass', 'bug', 'dark', 'dragon', 'electric', 'fairy',
        'fighting', 'fire', 'flying', 'ghost', 'ground', 'ice',
        'normal', 'poison', 'physhic', 'rock', 'steel', 'water']
        .map(label => ({ label, value: label })),
    selected: [],
    filterOn: false,
    filterUpdateCtrl: false,
    filteredPokeArr: [],
}

export default function Filter (state = initialState, {type, payload}){
    switch(type){
        case 'GET_TYPES':
            return {
                ...state,
                types: payload,
            }
        case 'GET_SELECTED_TYPES':
            return {
                ...state,
                selected: payload,
            }
        case 'FILTER_CONTROL':
            return {
                ...state,
                filterOn: payload,
            }
        case 'GET_FILTERED_ARRAY':
            return {
                ...state,
                filteredPokeArr: payload,
            }
        case 'GET_FILTER_UPDATE_CONTROL':
            return {
                ...state,
                filterUpdateCtrl: payload,
            }
        default: return state; 
    }
}