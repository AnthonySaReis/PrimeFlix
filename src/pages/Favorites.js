import React from 'react';
import { useEffect, useState } from 'react';
import './Favorites.css';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

export default function Favorites() {
    
    const [movies, setMovies] = useState([]);

    useEffect(()=>{

    const myList = localStorage.getItem("@primeflix");
    setMovies(JSON.parse(myList) || []);

    }, [])
    
    const handleMovie = (id)=>{
        
        //filtrar e devolver todos os filmes, exceto o recebido pela função
        let filterMovies = movies.filter((item)=>{
        return (item.id !== id); 
        })

        
        //lista atualizada
        setMovies(filterMovies);
        localStorage.setItem('@primeflix', JSON.stringify(filterMovies));
        
        toast.success("Filme removido com sucesso!");
    
    }

    return (
    <div className='myMovies'>
        <h1>Meus Filmes</h1>

        {movies.length === 0 && <span>Nenhum filme salvo :( </span>}

        <ul>
            {movies.map((item)=>{
                return(
                    <li key={item.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}/>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filme/${item.id}`} >Detalhes</Link>
                            <button onClick={()=> handleMovie(item.id) }>excluir</button>
                        </div>
                    </li>
                );
            })}
        </ul>
    </div>
  )
}
