import { useState, useEffect } from "react";
import {
  NavLink,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../assets/MovieApi";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };
    fetchDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <div className={css.Details}>
        <img
          className={css.Img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "280px", height: "360px" }}
        />
        <p className={css.Overview}>{movie.overview}</p>
      </div>
      <ul>
        <li>
          <NavLink
            to="cast"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            {" "}
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
