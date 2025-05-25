import { useEffect, useState } from "react";
import { searchMovies, fetchTrendingMovies } from "../../assets/MovieApi";
import css from "./MoviesPage.module.css";

import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) {
        setMovies([]);
        return;
      }

      setLoader(true);
      setError(null);

      try {
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch (err) {
        setError("Something went wrong. Try again");
      } finally {
        setLoader(false);
      }
    };

    fetchMovies();
  }, [query]);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoader(true);
      setError(null);

      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data.results);
      } catch (err) {
        setError("Sorry, your query could not be found");
      } finally {
        setLoader(false);
      }
    };

    fetchTrending();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  return (
    <div>
      <form className={css.Form} onSubmit={handleSubmit}>
        <input
          className={css.Input}
          type="text"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
          placeholder="What wanna whatch ?"
        />
        <button type="submit">Search</button>
      </form>

      {loader && <p>loader......</p>}
      {error && <p>error with connection..</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
