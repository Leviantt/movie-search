import React from "react";

const MovieCard = (props) => {
    const {Title, Year, Type, Poster} = props.movie;
    return (
        <div className="movie">
            <div className="movie-year">{Year}</div>
            <div className="movie-image"><img src={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400'} alt={Title}/></div>
            <div className="movie-title">
                <span>{Type}</span>
                <h3>{Title}</h3>    
            </div>
        </div>
    )
}

export default MovieCard