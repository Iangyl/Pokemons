import axios from 'axios';

const url = 'https://pokeapi.co/api/v2/';

export default function api(path) {
    const result = axios.get(`${url}${path}`)
        .then((res) => res);
    return result;
}
