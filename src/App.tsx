import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  runtime: number;
  description: string;
  emoji: string;
  bg: string;
}

const MOVIES: Movie[] = [
  { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, runtime: 148, description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", emoji: "🌀", bg: "#dbeafe" },
  { id: 2, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, runtime: 152, description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.", emoji: "🦇", bg: "#e2e8f0" },
  { id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.7, runtime: 169, description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on a distant planet.", emoji: "🚀", bg: "#ede9fe" },
  { id: 4, title: "Parasite", year: 2019, genre: "Thriller", rating: 8.5, runtime: 132, description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", emoji: "🏠", bg: "#dcfce7" },
  { id: 5, title: "Dune", year: 2021, genre: "Sci-Fi", rating: 8.0, runtime: 155, description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.", emoji: "🏜️", bg: "#fef9c3" },
  { id: 6, title: "The Shawshank Redemption", year: 1994, genre: "Drama", rating: 9.3, runtime: 142, description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", emoji: "🔓", bg: "#fee2e2" },
  { id: 7, title: "Everything Everywhere All at Once", year: 2022, genre: "Sci-Fi", rating: 7.8, runtime: 139, description: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.", emoji: "🥢", bg: "#fce7f3" },
  { id: 8, title: "Oppenheimer", year: 2023, genre: "Drama", rating: 8.3, runtime: 180, description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.", emoji: "💥", bg: "#ffedd5" },
  { id: 9, title: "Spirited Away", year: 2001, genre: "Animation", rating: 8.6, runtime: 125, description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.", emoji: "🌊", bg: "#ccfbf1" },
  { id: 10, title: "Whiplash", year: 2014, genre: "Drama", rating: 8.5, runtime: 107, description: "A promising young drummer enrolls at a cut-throat music conservatory where his only teacher will stop at nothing to realize a student's potential.", emoji: "🥁", bg: "#fef2f2" },
  { id: 11, title: "Arrival", year: 2016, genre: "Sci-Fi", rating: 7.9, runtime: 116, description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.", emoji: "🛸", bg: "#eef2ff" },
  { id: 12, title: "The Godfather", year: 1972, genre: "Drama", rating: 9.2, runtime: 175, description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", emoji: "🌹", bg: "#f1f5f9" },
];

const GENRE_BADGE: Record<string, string> = {
  "Sci-Fi": "primary",
  "Action": "danger",
  "Drama": "warning",
  "Thriller": "dark",
  "Animation": "success",
};

export default function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [tab, setTab] = useState<"browse" | "watchlist">("browse");
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);

  const genres = ["All", ...Array.from(new Set(MOVIES.map((m) => m.genre)))];

  const filteredMovies = MOVIES.filter((m) => {
    if (tab === "watchlist" && !watchlist.includes(m.id)) return false;
    if (genre !== "All" && m.genre !== genre) return false;
    if (query && !m.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const toggleWatchlist = (id: number) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const inWatchlist = selected ? watchlist.includes(selected.id) : false;

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4 py-3 mb-4">
        <span className="navbar-brand fw-bold fs-4">🎬 CineSearch</span>
        <span className="badge bg-secondary fs-6">
          {watchlist.length} saved
        </span>
      </nav>

      <div className="container pb-5">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "browse" ? "active" : ""}`}
              onClick={() => setTab("browse")}
            >
              Browse
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "watchlist" ? "active" : ""}`}
              onClick={() => setTab("watchlist")}
            >
              Watchlist{watchlist.length > 0 && ` (${watchlist.length})`}
            </button>
          </li>
        </ul>

        {/* Search */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="btn btn-outline-secondary" onClick={() => setQuery("")}>
              ✕
            </button>
          )}
        </div>

        {/* Genre Filters */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {genres.map((g) => (
            <button
              key={g}
              className={`btn btn-sm ${genre === g ? "btn-dark" : "btn-outline-secondary"}`}
              onClick={() => setGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center text-muted py-5">
            <div style={{ fontSize: 48 }}>🎞️</div>
            <p className="mt-2">
              {tab === "watchlist" ? "Your watchlist is empty." : "No movies found."}
            </p>
          </div>
        ) : (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="col">
                <div
                  className="card h-100 shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(movie)}
                >
                  {/* Poster */}
                  <div
                    className="d-flex align-items-center justify-content-center position-relative"
                    style={{ background: movie.bg, aspectRatio: "2/3", fontSize: 52 }}
                  >
                    {movie.emoji}
                    <span
                      className="position-absolute top-0 end-0 m-2 badge bg-dark"
                      style={{ fontSize: 11 }}
                    >
                      ⭐ {movie.rating}
                    </span>
                  </div>

                  <div className="card-body p-2">
                    <h6 className="card-title mb-1 text-truncate">{movie.title}</h6>
                    <p className="text-muted mb-1" style={{ fontSize: 12 }}>
                      {movie.year} · {movie.runtime}m
                    </p>
                    <span className={`badge text-bg-${GENRE_BADGE[movie.genre] || "secondary"}`} style={{ fontSize: 10 }}>
                      {movie.genre}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selected.title}</h5>
                <button className="btn-close" onClick={() => setSelected(null)} />
              </div>

              <div className="modal-body">
                {/* Poster */}
                <div
                  className="d-flex align-items-center justify-content-center rounded mb-3"
                  style={{ background: selected.bg, height: 160, fontSize: 80 }}
                >
                  {selected.emoji}
                </div>

                {/* Stats */}
                <div className="row g-2 mb-3">
                  {[
                    { label: "Rating", value: `⭐ ${selected.rating}` },
                    { label: "Year", value: selected.year },
                    { label: "Runtime", value: `${selected.runtime}m` },
                  ].map((s) => (
                    <div key={s.label} className="col-4">
                      <div className="bg-light rounded text-center p-2">
                        <div className="text-muted" style={{ fontSize: 11 }}>{s.label}</div>
                        <div className="fw-semibold" style={{ fontSize: 15 }}>{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-muted" style={{ fontSize: 13 }}>
                  {selected.description}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className={`btn w-100 ${inWatchlist ? "btn-success" : "btn-outline-dark"}`}
                  onClick={() => toggleWatchlist(selected.id)}
                >
                  {inWatchlist ? "✓ Saved to Watchlist" : "+ Add to Watchlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
