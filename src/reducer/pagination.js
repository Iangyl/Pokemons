const initialState = {
    currentPage: 1,
    pokemonsPerPage: 9,
    firstPage: true,
    lastPage: false,
};

export default function Pagination(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_CURRENT_POKEMONS':
            return {
                ...state,
                currentPosts: payload,
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: payload,
            }
        case 'CHECK_FIRST_PAGE':
            return {
                ...state,
                firstPage: payload,
            }
        case 'CHECK_LAST_PAGE':
            return {
                ...state,
                lastPage: payload,
            }
    }
    return state;
}