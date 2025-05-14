import { useEffect, useState } from "react";
import Card from "./card";
// import Button from "./button";
import { getPopularMovies, trending} from "../services/api";
import { ReactComponent as Info } from '../assets/icons8-information-64.svg';
import {ReactComponent as Add} from '../assets/add_icon2.svg';
import {ReactComponent as Checked} from '../assets/checked_icon.svg';
import {ReactComponent as Star} from '../assets/star-circle2.svg';
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthenContext";

function Hero(){
    // react hooks
    const [movies, setMovies] = useState([]);
    const [movieIndex, setMovieIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {user, favorite, addUserFavorite, removeFav} = useAuth();

    useEffect(()=>{
        const loadMovies = async ()=>{
            try{
                const popularMovies = await trending();
                setMovies(popularMovies);
               
            }catch(err){
                console.error(err.message);
                
            }
        }
        loadMovies()
    }, [])

    const backgroundImg = movies[movieIndex]?.backdrop_path;
    const year = new Date(movies[movieIndex]?.release_date || movies[movieIndex]?.first_air_date);
    const rating = movies[movieIndex]?.vote_average.toFixed(1);
    const show_id = movies[movieIndex]?.id;
    const media_type = movies[movieIndex]?.media_type;
    const isAdded = favorite.some(item => item.showId === show_id);

    // functions
    function showAsBackground(index){
        console.log(index)
        setMovieIndex(index)
    }

    async function addToList(){
        try{
            const sendData = {email: user.user.email, id: show_id, showType: media_type};
            if(isAdded ===  false){
                await addUserFavorite(sendData);
            }else{
                await removeFav(sendData);
            }
           
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
            {/* <div className=" border-4 border-pink-300 h-screen w-screen"> */}
            <div
                    className="min-h-screen w-full flex flex-col sm:grid sm:grid-cols-3  snap-start snap-always"
                    style={{
                        backgroundImage: ` 
                        linear-gradient(105deg, #000000 30%, rgba(0, 0, 0, 0) 45%),
                        url(https://image.tmdb.org/t/p/original/${backgroundImg})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'right',
                        height: '100vh',
                        width: '100%',
                        color: 'white',
                    }}>

                    <div className="flex flex-cols h-full overflow-hidden items-center">
                        <div className="p-2 w-full ">
                            <div className="flex flex-col gap-5 justify-center ml-5">
                                <h1 className="font-[Boldonse] text-3xl font-extrabold  font-stretch-100% basis-center text-purple-500">
                                    {movies[movieIndex]?.title|| movies[movieIndex]?.name ||"Title"}
                                </h1>

                                <div className="flex flex-row gap-2 italic">
                                    <span className="flex flex-row"><Star className="h-6 w-6 mr-1"/> {rating||8.1}</span>
                                    <span>| {year.getFullYear() || 'XXXX'}</span>
                                    <span>| 1h 56min</span>
                                </div>

                                <p className="font-[Dosis-Light] ">
                                    {movies[movieIndex]?.overview}
                                </p>

                                <div className="flex flex-row gap-5">
                                 
                                    <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    size="large" 
                                    startIcon={<Info className="w-7 h-7 fill-white"/>} 
                                    onClick={()=> navigate(`/info/${show_id}`, {
                                        state: {
                                            id: show_id,
                                            isMovie: media_type === "movie" ? true : false
                                        }
                                    })}
                                    >Get info</Button>


                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        startIcon={isAdded?<Checked className="w-7 h-7"/>:<Add className=" w-7 h-7 fill-white"/>}
                                        onClick={addToList}
                                    >{isAdded? "Remove from list":"Add To List"}</Button>
                                </div>
                                
                                 
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 flex flex-col justify-end overflow-x-hidden invisible sm:visible">
                       
                        <div className="ml-10   flex flex-row gap-4 overflow-x-scroll overflow-y-visible scroll-smooth scrollbar-hide snap-x scroll-pl-2 pl-3 py-4">
                            {/* {images.map((img, index)=>(
                                <div className="snap-start" key={index}>
                                 <HeroCard  key={index} img={img} clickListner={()=>showAsBackground(index)} />
                                </div>
                            ))}  */}
                            {movies.map((data, index)=>(
                                <div className="snap-start" key={index}>
                                 <Card  
                                    key={data.id} 
                                    data={data} 
                                    onClick={()=>showAsBackground(index)} 
                                    style={"flex flex-col h-60 w-45 overflow-hidden rounded-3xl transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"}
                                />
                                </div>
                            ))} 
                        </div>
                       
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default Hero;
