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
    <div className="relative min-w-0 flex-[1_1_340px] max-[900px]:order-3 max-[900px]:basis-full">
      <div className="flex w-full items-center justify-center gap-2.5 max-[600px]:flex-wrap">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-[min(420px,100%)] rounded-full border border-white/10 bg-white/[0.07] px-4 py-3 text-[15px] text-white outline-none transition duration-250 placeholder:text-[#7f7f8a] focus:border-[rgba(229,9,20,0.75)] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(229,9,20,0.16)] max-[600px]:w-full"
        />

        <button
          type="button"
          className="inline-flex min-h-[42px] cursor-pointer items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#e50914,#9f0710)] px-5 py-[11px] text-center font-extrabold tracking-[0.01em] text-white shadow-[0_10px_24px_rgba(229,9,20,0.22)] transition duration-250 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#ff3b45,#e50914)] hover:shadow-[0_0_28px_rgba(229,9,20,0.25)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(229,9,20,0.35)] max-[600px]:w-full"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {submitted && (
        <div className="absolute left-1/2 top-[calc(100%+14px)] max-h-[min(76vh,760px)] w-[min(920px,calc(100vw-24px))] -translate-x-1/2 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[rgba(8,8,11,0.96)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.65)] backdrop-blur-[18px] max-[600px]:fixed max-[600px]:top-28 max-[600px]:left-3 max-[600px]:right-3 max-[600px]:w-auto max-[600px]:translate-x-0">
          <h2 className="mb-3.5 mt-0 p-0 text-xl font-black tracking-[-0.03em] text-white">
            {filteredMovies.length > 0
              ? `Results for "${search}"`
              : `Sorry, no results found for "${search}"`}
          </h2>

          <div className="max-h-[62vh] overflow-y-auto pr-2">
            {filteredMovies.map((movie) => (
              <a key={movie.id} href={movie.link} className="no-underline">
                <div className="mb-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3 transition duration-250 hover:border-[rgba(229,9,20,0.38)] hover:bg-white/10 max-[600px]:gap-3">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="aspect-[2/3] h-auto w-[92px] rounded-xl object-cover max-[600px]:w-[72px]"
                  />
                  <div>
                    <h3 className="m-0 text-white">{movie.title}</h3>
                    <p className="mt-2 text-[#b8b8c2]">{movie.year}</p>
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