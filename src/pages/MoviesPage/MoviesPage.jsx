import { useState } from "react";
import { searchMovies } from "../../assets/MovieApi";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await searchMovies(query);
    setMovies(data.results);
  };

  return (
    <div>
      <form className={css.Form} onSubmit={handleSubmit}>
        <input
          className={css.Input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What wanna whatch ?"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
