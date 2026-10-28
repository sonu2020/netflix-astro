import { useEffect, useRef, useState } from "react";

export default function MovieSearchBar({ movies }) {
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);

  const query = search.trim().toLowerCase();

  const filteredMovies = (movies || []).filter((movie) =>
    [movie.title, movie.genre, movie.language, movie.year].some((field) =>
      String(field ?? "")
        .toLowerCase()
        .includes(query),
    ),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSubmitted(false);
    }
  };

  // Close the results on Escape or when tapping/clicking outside
  useEffect(() => {
    if (!submitted) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSubmitted(false);
    };
    const handlePointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSubmitted(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [submitted]);

  return (
    <div ref={containerRef} className="relative w-full min-w-0">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2"
      >
        <input
          type="text"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          aria-label="Search movies"
          placeholder="Search movies..."
          value={search}
          onChange={handleChange}
          className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2.5 text-base text-white outline-none transition duration-300 placeholder:text-[#7f7f8a] focus:border-[rgba(229,9,20,0.75)] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(229,9,20,0.16)] sm:py-3"
        />

        <button
          type="submit"
          className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#e50914,#9f0710)] px-4 py-2.5 text-center text-sm font-extrabold tracking-[0.01em] text-white shadow-[0_10px_24px_rgba(229,9,20,0.22)] transition duration-300 hover:bg-[linear-gradient(135deg,#ff3b45,#e50914)] hover:shadow-[0_0_28px_rgba(229,9,20,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(229,9,20,0.6)] active:scale-95 sm:px-5 sm:text-base"
        >
          Search
        </button>
      </form>

      {submitted && (
        <div className="absolute inset-x-0 top-full z-50 mt-3 flex max-h-[70svh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(8,8,11,0.97)] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.65)] backdrop-blur-[18px] sm:inset-x-auto sm:right-0 sm:w-[min(640px,calc(100vw-3rem))] sm:rounded-3xl sm:p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h2
              aria-live="polite"
              className="m-0 min-w-0 break-words text-base font-black tracking-[-0.02em] text-white sm:text-xl"
            >
              {filteredMovies.length > 0
                ? `Results for "${search.trim()}"`
                : `Sorry, no results found for "${search.trim()}"`}
            </h2>

            <button
              type="button"
              aria-label="Close results"
              onClick={() => setSubmitted(false)}
              className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition duration-300 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgba(229,9,20,0.6)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 sm:pr-2">
            {filteredMovies.map((movie, index) => (
              <a
                key={movie.id ?? `${movie.title}-${index}`}
                href={movie.link}
                className="mb-2.5 block no-underline last:mb-0 sm:mb-3"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-2.5 transition duration-300 hover:border-[rgba(229,9,20,0.38)] hover:bg-white/10 sm:gap-4 sm:p-3">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    width="92"
                    height="138"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[2/3] w-16 shrink-0 rounded-xl bg-[#1a1a20] object-cover sm:w-[92px]"
                  />
                  <div className="min-w-0">
                    <h3 className="m-0 line-clamp-2 text-[0.95rem] font-bold leading-tight text-white sm:text-base">
                      {movie.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#b8b8c2]">
                      {movie.year}
                    </p>
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