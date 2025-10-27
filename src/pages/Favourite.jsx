import "../css/Favourite.css"
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourite(){
    const {favorites} = useMovieContext();

    if(favorites && favorites.length > 0) {
        return(
            <div className="favourites">
                <h2>Your Favourite Movies</h2>
                <div className="movies-grid">
                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        )
    }

    return <div className="favourites-empty">
    <h2>No Favourite Movies Yet!!</h2>
    <p>Start adding movies to your Favourite and they will appear here</p>
    </div>
}
export default Favourite;