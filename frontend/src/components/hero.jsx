import { useEffect, useState } from "react";
import HeroCard from "./hero_card";
import Button from "./button";
import { getPopular} from "../services/api";
import { ReactComponent as Info } from '../assets/icons8-information-64.svg';
import {ReactComponent as Add} from '../assets/add_icon2.svg';
import {ReactComponent as Star} from '../assets/star-circle2.svg';



function Hero(){
    // react hooks
    const [movies, setMovies] = useState([]);
    const [movieIndex, setMovieIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const images = [
        'placeholder1.jpg',
        'placeholder1.jpg',
        'placeholder1.jpg',
        'placeholder1.jpg',
        'placeholder1.jpg',
    ]

    // useEffect(()=>{
    //     const loadMovies = async ()=>{
    //         try{
    //             // const popularMovies = await getPopularMovies();
    //             // console.log(popularMovies)
    //             // set Movies
    //             // setMovies(popularMovies);
    //             //setbackgroundImg(popularMovies[bgIndex].poster_path);
                
    //             const testData = await getPopular();
    //             setMovies(testData.shows)
    //             console.log(testData)
                

    //         }catch(err){
    //             console.error(err.message);
                
    //         }
    //     }
    //     loadMovies()
    // }, [])

    // const backgroundImg = movies[movieIndex]?.poster_path;
    // const backgroundImg = movies[movieIndex]?.imageSet.horizontalBackdrop.w1440;

    // functions
    function showAsBackground(index){
        console.log(index)
        setMovieIndex(index)
    }

    return(
        <>
            {/* <div className=" border-4 border-pink-300 h-screen w-screen"> */}
            <div
                    className="min-h-screen w-full flex flex-col sm:grid sm:grid-cols-3  snap-start snap-always"
                    style={{
                        backgroundImage: ` 
                        linear-gradient(105deg, #000000 35%, rgba(0, 0, 0, 0) 45%),
                        url(https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg)`,
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
                                    Game of Thrones
                                </h1>

                                <div className="flex flex-row gap-2 italic">
                                    <span className="flex flex-row"><Star className="h-6 w-6 mr-1"/> 8.1</span>
                                    <span>| 2017</span>
                                    <span>| 1h 56min</span>
                                </div>

                                <p className="font-[Dosis-Light] ">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolores officia expedita corrupti quam deserunt quidem, excepturi aut dignissimos aperiam ipsam dolorum blanditiis praesentium asperiores suscipit nam ad! Earum, accusamus!
                                </p>

                                <div className="flex flex-row gap-5">
                                    <Button
                                        title= "Get Info"
                                        style= "border-1 border-purple-500 text-purple-500 h-10 w-40 rounded-2xl hover:bg-purple-500 hover:text-white group"
                                        icon={<Info className="w-7 h-7 fill-purple-500 group-hover:fill-white"/>}
                                    />
                                    <Button
                                        title= "My List"
                                        style= "border-1 h-10 w-40 rounded-2xl"
                                        icon={<Add className=" w-7 h-7 fill-white"/>}
                                    />
                                </div>
                                
                                 
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 flex flex-col justify-end overflow-x-hidden invisible sm:visible">
                       
                        <div className="ml-10   flex flex-row gap-4 overflow-x-scroll overflow-y-visible scroll-smooth scrollbar-hide snap-x scroll-pl-2 pl-3 py-4">
                            {images.map((img, index)=>(
                                <div className="snap-start" key={index}>
                                 <HeroCard  key={index} img={img} clickListner={()=>showAsBackground(index)} />
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
