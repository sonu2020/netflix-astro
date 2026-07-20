import { useState } from "react";

export default function MovieSearchBar({ movies }) {
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredMovies = (movies || []).filter((movie) => {
    const query = search.toLowerCase();

    return (
      movie.title?.toLowerCase().includes(query) ||
      movie.genre?.toLowerCase().includes(query) ||
      movie.language?.toLowerCase().includes(query) ||
      
      movie.year?.toLowerCase().includes(query) 

    );
  });

  const handleSearch = () => {
    if (search.trim()) {
      setSubmitted(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setSubmitted(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
  <input
    type="text"
    placeholder="Search movies..."
    value={search}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
  />

  <button className="btn" onClick={handleSearch}>
    Search
  </button>
</div>

 {submitted && (
  <div className="search-results">
    <h2 className="title">
      {filteredMovies.length > 0
        ? `Results for "${search}"`
        : `Sorry, no results found for "${search}"`}
    </h2>

    <div className="movie-list">
      {filteredMovies.map((movie) => (
        <a
          key={movie.id}
          href={movie.link}
          style={{ textDecoration: "none" }}
        >
          <div className="movie-item">
            <img src={movie.image} alt={movie.title} />
            <div>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
)}
    </div>
  );
}