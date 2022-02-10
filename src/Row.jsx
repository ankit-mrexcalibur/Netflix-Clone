import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original"


function Row(props) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        //if [], run once when the row loads, and dont run again
        //if we put [movies], then this code runs everytime movies change
        async function fetchData() {
            const request= await axios.get(props.fetchURL);
            console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[props.fetchURL]);
    return (
        <div className="row">
            {/*title*/}
            <h2>{props.title}</h2>
            {/*container-->posters*/}
            <div className="row_posters">
                {movies.map(movie => (
                    <img
                    key={movie.id}
                    className={`row_poster ${props.isLargeRow && "row_posterLarge"}`} 
                    src={`${base_url}${props.isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                    alt={movie.name}/>
            ))}
            </div>
        </div>
    )
}

export default Row;

