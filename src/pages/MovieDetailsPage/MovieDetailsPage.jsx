import { useState, useEffect } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../../assets/MovieApi";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) return <p>Завантаження...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Назад</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <Link to="cast">Акторський склад</Link>
      <Link to="reviews" style={{ marginLeft: "15px" }}>
        Огляди
      </Link>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
