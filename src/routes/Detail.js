import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";

function Detail(){
    const {id} = useParams();
    const [loading, setLoading] = useState(true); 
    const [movie, setMovie] = useState([]);
    const getMovie = async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    };
    useEffect(()=>{
        getMovie();
    }, []);
    useEffect(()=>{
        console.log(movie);
        
    }, [movie]);
    const toHome = () => {

    }

    return (
    <div>
        {loading && movie.length == 0 ? <h2>Loading ... </h2> : <div>
            <h1>DETAIL</h1>
            <img src={movie.medium_cover_image}/>
            <h2>{movie.id}</h2>
            <h2>{movie.title}</h2>
            <ul>
                {movie.genres.map((g)=>(
                    <li key={g}>{g}</li>
                ))}
            </ul>
            <p>{movie.description_intro}</p>
            <Link to={`/`}>home</Link>
        </div>
        }
    </div>
    );
}

export default Detail;