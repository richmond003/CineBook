import Cast from "../components/cast";
import DropdownButton from "../components/dropdown_button";
import {ReactComponent as EyeIcon} from '../assets/eye_icon.svg'
import Card from "../components/card";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getCast, getDetails, getGallary, getTrailer } from "../services/api";
import {Avatar, Button, Divider, Rating} from '@mui/material';


function Show(){
    const [details, setDetails] = useState({
        title: '',
        tagline: '',
        director: '',
        writer: '',
        country: '',
        runtime: '',
        genres: [],
        overview: '',
        poster: '',
        bgImage: '',
        homepage: ''
        
    })
    const [casts, setCasts] = useState([])
    const [trailer, setTrailer] = useState("")
    const [gallary, setGallary] = useState({})
    const location = useLocation();
    const {id, isMovie} = location.state || {}
    const data = ['Trailers', 'Season 1', 'Season 2'];

    useEffect(()=>{
        const loadDetails = async ()=>{
            try{
                // getting show details
                const detailsData = await getDetails(isMovie?"movie":"tv", id)
                console.log(detailsData)
                setDetails({
                    title: isMovie? detailsData.title : detailsData.name,
                    tagline: detailsData.tagline,
                    runtime: detailsData.runtime,
                    genres: detailsData.genres,
                    overview: detailsData.overview,
                    poster: detailsData.poster_path,
                    homepage: detailsData.homepage,
                    bgImage: detailsData.backdrop_path
                })
                // getting all acting casts
                const castData = await getCast(isMovie?"movie":"tv", id)
                setCasts(castData)
                // getting show trailer
                const trailerKey = await getTrailer(isMovie?"movie":"tv", id)
                console.log("Trailer key: ", trailerKey)
                setTrailer(trailerKey)
                //get All show Images
                const imagesData = await getGallary(isMovie? "movie": "tv", id);
                console.log(imagesData);
                setGallary(imagesData);
            
            }catch(err){
                console.error(err.message)
            }
        }
        loadDetails();
    }, [])

    const runtime = details.runtime;
    console.log('runtime: ',runtime)
    const runtimeHours = Math.floor(runtime / 60);
    const runtimeMinutes = runtime % 60;
    const runtimeString = `${runtimeHours}h ${runtimeMinutes}min`;

    const homePage = ()=>{
        window.location.href = details?.homepage;
    }
    return (
        <>
            <div 
                className="relative  h-screen w-screen  flex flex-col justify-start"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.bgImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'left',
                    height: '100vh',
                    width: '100%',
                }}
                >
                <div className="h-full w-full sm:grid sm:grid-cols-5 justify-evenly">
                    <div className="col-span-3 flex flex-col justify-end pl-5">   
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <h1 
                                className="font-[Boldonse] text-3xl font-extrabold  font-stretch-100% basis-center text-purple-500"
                                >{details.title || "BIG TITLE"}</h1>
                            <h3 className="">{details.tagline || ""}</h3>
                        </div>

                        <div className="flex flex-row items-center gap-7">
                            <Button 
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{bgcolor: "red"}}
                                onClick={homePage}
                            >Watch Now</Button>

                            <Button 
                                variant="contained"
                                color="secondary"
                                size="large"
                            >Add to My List</Button>
                        </div>

                        <div className="mb-5">
                           {/* <div className="pl-2"><DropdownButton options={data}/></div> */}
                                <div className="border-pink-400 flex flex-row gap-2 overflow-x-scroll scrollbar-hide ">
                                    {
                                        gallary.backdrops?.map((image, i)=>(
                                            <div className="h-full rounded-2xl">
                                                <div className=" w-75 h-40 rounded-2xl overflow-hidden">
                                                    <img
                                                    src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                                                    alt={details.title}
                                                    className="h-ful w-full object-cover"
                                                    />
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div> 
                        </div>
                    </div>
                    </div>
                    <div className="flex flex-col col-span-2 backdrop-blur-lg py-5 px-4 items-center gap-2 z-0">
                        <div className="flex flex-col justify-center gap-2">
                            <iframe
                                title="YouTube Trailer"
                                width="450"
                                height="250"
                                className="rounded-2xl"
                                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />

                            <div className="flex flex-row gap-4 items-center">
                                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly/>
                                <div>2.5</div>
                            </div>  
                        </div>

                        <Divider variantsx={{color: "red"}} className="z-40"/>
                        <div className="w-full border border-gray-400"></div>
                        <hr className="text-purple-500 z-40"/>
                        <div>
                            {details.overview || ""}
                        </div>
                    </div>
                </div>

               
               
            </div>
            <div className="border-lime-400 flex flex-col  w-full px-5 gap-10">
                <div className="border-blue-500 w-full flex flex-row justify-center mt-20 gap-5">
                    {/* <div className="border-amber-300 flex flex-col  justify-between gap-3">
                        <div className="border-2 h-70 w-50 overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/original${details.poster}` || ""}
                                alt={details.title || "Broken image"}
                                className="h-full w-full object-fill"
                            />
                        </div>

                        <Button 
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{bgcolor: "red"}}
                            onClick={homePage}
                        >Watch Now</Button>
                        <Button 
                            variant="outlined"
                            color="secondary"
                            size="large"
                        >Add to My List</Button>

                    </div> */}

                    <div className="flex flex-col border-cyan-400 basis-4xl gap-2 ">
                        <h1 className="text-4xl font-extrabold">{details.title || 'TITLE'}</h1>
                        <hr/>
                        <div className="flex flex-row gap-5 items-center">
                            <div className="flex flex-row gap-2 justify-center items-center">
                                 <EyeIcon className="h-5 w-5"/>
                                 <span>20000</span>
                            </div>
                            |
                            <div>stars</div>
                            |
                            <div>{runtimeString||"Xh Xmin"}</div>
                            |
                            <div>2017</div>
                        </div>
                        <hr/>
                        <div className="flex flex-row justify-between">
                            <div className=" w-[50%] flex flex-col gap-3">
                                <h1>DETAILS</h1>
                                <div>
                                    <div>Director: <span>Name</span></div>
                                    <div>Writer: <span>Name</span></div>
                                    <div>Country: <span>Name</span></div>
                                    <div>Language: <span>Name</span></div>
                                    <div>Release Date: <span>Name</span></div>
                                </div>
                            </div>
                            <div className="w-[50%] flex flex-col gap-3"> 
                                GENRES
                                <ul>
                                   {details.genres.map((genre, index)=>(
                                        <li key={index}>{genre.name}</li>
                                   ))}
                                </ul>
                            </div>
                        </div>

                        <hr/>
                        <div>
                            STORYLINE
                            <p>{details.overview || "No DATA"}</p>
                        </div>
                    </div>


                     <div className="border-amber-300 w-80">
                        <div className="h-full w-full rounded-2xl overflow-hidden ">
                            <img
                                src={`https://image.tmdb.org/t/p/original${details.poster}` || ""}
                                alt={details.title || "Broken image"}
                                className="h-full w-full object-cover"
                            />
                        </div>


                    </div> 
                </div>

                <div className="flex flex-col gap-5 w-full">
                    <h1 className="text-3xl font-bold">Cast</h1>
                    <div className="grid grid-cols-5 gap-y-5">
                    {casts.map((cast,index)=>(
                        cast.known_for_department === "Acting"? <Cast data={cast} key={index}/> : null
                    ))}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">Recommendations</h1>
                    <div className="flex flex-row gap-4 overflow-x-scroll scrollbar-hide">
                        {
                            [...Array(10)].map((_, i)=>(
                                <div>
                                    <Card/>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

        </>
    )
}


export default Show


//sandbox="allow-scripts allow-same-origin allow-popups"

