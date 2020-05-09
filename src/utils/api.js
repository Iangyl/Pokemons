import axios from 'axios';

const url = 'http://5e85e2d544467600161c69cf.mockapi.io/api/';

export default function api(path) {
    const result = axios.get(`${url}${path}`)
        .then((res) => res);
    return result;
}
