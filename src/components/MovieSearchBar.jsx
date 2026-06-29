import { useState } from "react";

export default function MovieSearchBar({ movies }) {
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    if (search.trim()) setSubmitted(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSubmitted(false);
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {submitted && (
        <div className="search-results">
          <h2>
            {filteredMovies.length > 0
              ? `Results for "${search}"`
              : `No results found for "${search}"`}
          </h2>
          <div className="movie-card">
            {filteredMovies.map((movie) => (
              <a                              
                key={movie.title}
                href={movie.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    width="200"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}