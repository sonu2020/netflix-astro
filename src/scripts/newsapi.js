export async function getMovieNews() {
  const apiKey = import.meta.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=movie OR cinema OR Bollywood OR Hollywood OR Malayalam OR Tamil&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Netflix-Astro-App/1.0",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(data.message || "Failed to fetch news");
  }

  return data.articles || [];
}
