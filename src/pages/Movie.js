import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../services/api';
import './Movie.css';
import {toast} from 'react-toastify'; 

export default function Movie() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  //iniciar página carregando dados da api
  useEffect(()=>{

    async function loadMovie(){
      await api.get(`/movie/${id}`,{
      params:{
        api_key:'7ede58c32a5f7e6497f36d7938124f46',
        language: 'pt-BR',
      }
      })
      .then((response)=>{
        setMovie(response.data);
        setLoading(false);
      })
      .catch(()=>{
        navigate("/", {replace: true});
        return;
      })
    }

    loadMovie();


   // return()=>{
       
   // }

  },[navigate, id]);

  const saveMovie = () =>{
    const myList = localStorage.getItem("@primeflix");

    //manter filmes salvos, se não tiver deixa vazio
    let savedMovies = JSON.parse(myList) || [];

    //verificar se o filme já está na lista
    const hasMovie = savedMovies.some((savedMovie)=> savedMovie.id === movie.id);

    if(hasMovie){
      
      toast.warn("Filme já adicionado na lista");
      
      return;
    }
    //adicionar a lista
    savedMovies.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(savedMovies));
    
    toast.success("Filme Salvo com sucesso");

  }

  //tela de loading
  if(loading){
  return(
    <div className='movie-info'>
      <h1>Carregando Detalhes</h1>
    </div>
  )
  }

  return (
    <div className='movie-info'>
      
      <h1>{movie.title}</h1>
     
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
      
      <h3>Sinopse</h3>
      
      <span>{movie.overview}</span>
      
      <strong>Avaliação: {Math.floor(movie.vote_average)} /10</strong>

      <div className='btn-area'>
        
        
        <button onClick={saveMovie} >Salvar</button>
        
        
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} trailer`}>
            Trailer
          </a>
        </button>
      </div>

    </div>
  )
}
