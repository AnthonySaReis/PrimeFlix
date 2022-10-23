import React from 'react'
import { useEffect, useState } from 'react'
import api from '../services/api';
import {Link} from 'react-router-dom';
import './Home.css';

export default function Home() {
  
  const [movies, setMovies] = useState([]);
  const [laoding, setLoading] = useState(true);

  useEffect(()=>{

    async function loadMovies(){
      const response = await api.get("/movie/now_playing", {params:{
        api_key:'7ede58c32a5f7e6497f36d7938124f46',
        language: 'pt-BR',
        page: 1,
      }
    })   
    
   
    setMovies(response.data.results.slice(0,16)); 
    
    setLoading(false);
  }

  loadMovies();

  }, []);
  
  if(laoding){
    return(
      <div className='loading'>
        <h2>Carregando Filmes...</h2>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='list-movies'>
       
        {movies.map((item)=>{
          return(
            <article key={item.id}>
              <strong>{item.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title}/>
              <Link to={`/filme/${item.id}`}>Acessar</Link>          
            </article>
          );
    })}
      
      </div>
    </div>
  )
}
