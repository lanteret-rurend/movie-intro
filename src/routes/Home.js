import {useState, useEffect} from "react";
import Movie from "../components/Movie";

function Home(){
    const [loading, setLoading] = useState(true); 
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const json = await (
        await fetch(
            "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
        )
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(()=>{
        getMovies();
    },  []);

    useEffect(()=>{
        console.log(movies)
    },  [movies]);

    return (<div>
        <div>
            {loading && movies.length == 0 ? <h2>Loading ... </h2> : 
            <div>
                {movies.map((movie) => (
                <Movie 
                    key={movie.id}
                    id={movie.id}
                    coverImg={movie.medium_cover_image}
                    title={movie.title_english}
                    summary={movie.summary}
                    genres={movie.genres}
                />
                ))}
            </div>
            }
            </div>
        </div>
    );
}

export default Home;
