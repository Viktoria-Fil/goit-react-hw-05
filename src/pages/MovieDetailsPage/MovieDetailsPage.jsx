import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { fetchMovieDetails } from "../../assets/MovieApi";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function getDataById() {
      try {
        setLoader(true);
        setError(false);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getDataById();
  }, []);

  return (
    <div>
      <Link to={backLinkRef.current} className={css.btn}>
        Go Back
      </Link>
      {loader && <p>Please wait, loading ...</p>}
      {error && <p>Please reload the page </p>}
      {movie && (
        <div className={css.section}>
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
        </div>
      )}
      <div>
        <ul className={css.addInfo} key={Date.now()}>
          <li key="cast">
            <Link to="cast">Cast</Link>
          </li>
          <li key="reviews">
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={"Loading page..."}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
