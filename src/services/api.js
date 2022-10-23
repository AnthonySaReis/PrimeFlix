import axios from 'axios';
//BASE DA URL: https://api.themoviedb.org/3

//URL DA API: /movie/now_playing?api_key=7ede58c32a5f7e6497f36d7938124f46&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
});

export default api;