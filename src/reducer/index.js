import { combineReducers } from 'redux';

import pokemons from './pokemons';
import pagination from './pagination';
import search from './search';

export default combineReducers({
    pokemons,
    pagination,
    search,
}) 