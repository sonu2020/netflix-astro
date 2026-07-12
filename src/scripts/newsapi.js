export async function getMovieNews() {
  const apiKey = import.meta.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=movie OR cinema OR Bollywood OR Hollywood OR Malayalam OR Tamil&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;

  const response = await fetch(url);

  const data = await response.json();
  console.log(import.meta.env.NEWS_API_KEY);
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch news");
  }

  return data.articles;
}
