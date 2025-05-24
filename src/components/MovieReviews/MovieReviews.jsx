import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../assets/MovieApi";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchMovieReviews(movieId);
      setReviews(data.results);
    };

    fetchReviews();
  }, [movieId]);

  return reviews.length > 0 ? (
    <ul>
      {reviews.map((review) => (
        <li className={css.Rev} key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No reviews yet</p>
  );
};

export default MovieReviews;
