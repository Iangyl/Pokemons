const initialState = {
    searchedArr: [],
    searchOn: false,
};

export default function Pagination(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_SEARCH_ARRAY':
            return {
                ...state,
                searchedArr: payload,
            }
        case 'SEARCH_CONTROL':
            return {
                ...state,
                searchOn: payload,
            }
        default: return state;
    }
}