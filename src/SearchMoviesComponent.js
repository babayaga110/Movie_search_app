import React from "react";
import { useState } from "react";
import MovieCard from "./MovieCards";

export default function SearchMovieComponent(){
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e)=>{
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=a22418558ead62b23c6c452d9975219c&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try{
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results)
            console.log(data)
        }catch(err){
            console.log(err)
        }
        
    }
    return(
        <>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Movie Name</label>
            <input className="input" type="text" name="query" placeholder="i.e. Jurassic Park"
             value={query} onChange={(e)=>setQuery(e.target.value)}/>

            <button className="button" type="submit">Search</button>
        </form>
        <div className="card-list">
                {movies.filter(movie =>movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>    
      
        </>
    )
}