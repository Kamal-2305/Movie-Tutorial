
import "../css/MovieModal.css";

function MovieModal({movie, onClose}) {
    if(!movie) return null;
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";
    const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "";
    const genres = movie.genres ? movie.genres.map(g=>g.name).join(", ") : "";
    const crew = movie.credits?.crew ? movie.credits.crew.slice(0,5) : [];
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                <div className="modal-left">
                    <img src={poster} alt={movie.title} />
                </div>
                <div className="modal-right">
                    <h2>{movie.title} <span className="tagline">{movie.tagline}</span></h2>
                    <p className="meta">{movie.release_date} • {movie.runtime} min • {genres}</p>
                    <p className="overview">{movie.overview}</p>
                    <h4>Top Crew</h4>
                    <ul className="crew-list">
                        {crew.map(c=>(
                            <li key={c.credit_id}><strong>{c.name}</strong> — {c.job}</li>
                        ))}
                    </ul>
                    <a className="imdb-link" href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer">View on IMDB</a>
                </div>
            </div>
        </div>
    )
}
export default MovieModal;
