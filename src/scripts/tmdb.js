const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${import.meta.env.TMDB_TOKEN}`,
  accept: "application/json",
};

async function fetchTMDB(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "TMDB request failed");
  }

  return data;
}

export async function getTrendingMovies() {
  const data = await fetchTMDB("/trending/movie/day");
  return data.results ?? [];
}
export async function getMovieDetails(id) {
  return await fetchTMDB(`/movie/${id}`);
}
