const initialState = {
    types: ['grass', 'bug', 'dark', 'dragon', 'electric', 'fairy',
        'fighting', 'fire', 'flying', 'ghost', 'ground', 'ice',
        'normal', 'poison', 'physhic', 'rock', 'steel', 'water']
        .map(label => ({ label, value: label })),
    selected: [],
    filterOn: false,
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
    }
    return state;
}