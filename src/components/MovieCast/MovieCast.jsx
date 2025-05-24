import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchMovieCredits } from "../../assets/MovieApi";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const location = useLocation();

  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  useEffect(() => {
    async function getDataCredits() {
      if (!movieId) {
        return;
      }
      const response = await fetchMovieCredits(movieId);
      const data = response.cast.slice(0, 5);

      setCast(data);
    }
    getDataCredits();
  }, [movieId]);

  return (
    <>
      <h2> Movie Cast </h2>
      {cast.length > 0 && (
        <ul key={`movie-${cast.id}`} className={css.list}>
          {cast.map((actor, index) => (
            <li key={`${actor.id}-${index}`}>
              <img
                className={css.Img}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : defaultImg
                }
              />

              <h3>{actor.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
