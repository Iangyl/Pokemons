import { combineReducers } from 'redux';

import pokemons from './pokemons';
import pagination from './pagination';

export default combineReducers({
    pokemons,
    pagination,
}) 