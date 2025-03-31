import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../assets/MovieApi";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Popular movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};
export default HomePage;
