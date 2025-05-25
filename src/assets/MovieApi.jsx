import axios from "axios";

const API =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWY5MjYxYWMxZWE3OTM2YmE4ZmFmZDY5MDFhMjgwMCIsIm5iZiI6MTc0MzQ0MDE5Ny4yODEsInN1YiI6IjY3ZWFjOTQ1OGQ0ZGE2MGU4MTBlY2EzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YPKfABKk2XwkPr2AI-7SNG0NPYEWs1UNw1DGjuHxtv4";
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${API}`,
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers,
  });
  return data;
};

export const searchMovies = async (query) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/search/movie`, {
      headers,
      params: { query },
    });
    return data;
  } catch (error) {
    console.log(`${BASE_URL}/search/movie error ${error}`);
    return null;
  }
};

export const fetchMovieDetails = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, { headers });
  return data;
};

export const fetchMovieCredits = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
      headers,
    });
    return data;
  } catch (error) {
    console.log(`error -${error}`);
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
      headers,
    });
    return data;
  } catch (error) {
    console.log(`error loading reviews -${error}`);
  }
};
export const getImageUrl = (path) => `${IMAGE_BASE_URL}${path}`;
