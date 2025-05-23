import React from "react";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li className={css.MovieLi} key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            {}
            {movie.poster_path ? (
              <img
                className={css.Img}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || "Picture unavailable"}
                style={{ width: "280px", height: "360px" }}
              />
            ) : (
              <p>Picture unavailable</p>
            )}
            <p className={css.Title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
