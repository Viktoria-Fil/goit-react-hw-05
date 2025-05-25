import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import { fetchMovieDetails } from "../../assets/MovieApi";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [det, setDet] = useState(null);
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
        setDet(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getDataById();
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkRef.current} className={css.btn}>
        Go Back
      </Link>
      {loader && <p>Please wait, loading ...</p>}
      {error && <p>Please reload the page </p>}
      {det && (
        <div className={css.section}>
          <h1>
            {det.title} <span>({det.release_date})</span>
          </h1>
          <div className={css.Details}>
            <img
              className={css.Img}
              src={`https://image.tmdb.org/t/p/w500${det.poster_path}`}
              alt={det.title}
              style={{ width: "280px", height: "360px" }}
            />
            <div className={css.Overview}>
              <h2>Overview:</h2>
              <p className={css.Overview}>{det.overview}</p>
              <h2>Genres:</h2>
              <p>
                {det.genres.map((item) => (
                  <span key={item.id}> {item.name}</span>
                ))}
              </p>
            </div>
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
