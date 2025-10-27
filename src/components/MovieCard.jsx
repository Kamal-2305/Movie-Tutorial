import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movie, onClick}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
    const favourite = isFavorite(movie.id);

    function onFavouriteClick(e){
        e.stopPropagation();
        e.preventDefault();
        if(favourite){
            removeFromFavorites(movie.id);
        }else{
            addToFavorites(movie);
        }
    }
    return(
        <div className="movie-card" onClick={(e)=>{ if(onClick){ onClick(movie.id); } }}>
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favourite-btn ${favourite ? "active" : ""}`} onClick={onFavouriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}
export default MovieCard;