import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { searchMovies, getPopularMovies, getMovieDetails } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // for modal
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // load popular movies once
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
        setError("Failed to load popular movies.");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // search form handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error searching for movies. Please try again.");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  // open modal and fetch details
  const openModal = async (movieId) => {
    try {
      setModalOpen(true);
      setSelectedMovie(null); // show blank until loaded
      const details = await getMovieDetails(movieId);
      setSelectedMovie(details);
    } catch (err) {
      console.error("Failed to fetch movie details:", err);
      setModalOpen(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={openModal} />
          ))}
        </div>
      )}

      {modalOpen && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => {
            setModalOpen(false);
            setSelectedMovie(null);
          }}
        />
      )}
    </div>
  );
}

export default Home;
