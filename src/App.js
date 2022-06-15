import React, { useState } from "react";
import './App.css';
import searchIcon from './searchIcon.svg'
import MovieCard from "./MovieCard";

const API_KEY = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [noResultsMessage, setNoResultsMessage] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_KEY}&s=${title}`);
        const data = await response.json();
        if(data.Response === 'False') {
            setMovies([]);
            setNoResultsMessage('No movies found');
            return;
        }
        setNoResultsMessage(''); 
        setMovies(data.Search);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const query = searchTitle.trim();
        if(query === '') return;
        
        searchMovies(query);
    }

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <form className="search" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Search for movies"
                    value={searchTitle}
                    onChange={(e) => {setSearchTitle(e.target.value)}}
                />
                <img
                    src={searchIcon}
                    alt='search'
                    type='submit'
                    onClick={handleSubmit}
                />
            </form>
            {movies.length > 0 ? (
                <div className="container">
                    {movies.map((movie, i) => (
                    <MovieCard movie={movie} key={`${movie.Title}-${i}`}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>{noResultsMessage}</h2>
                </div>
            )}
        </div>
    )
}

export default App;