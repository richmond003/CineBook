import { useEffect, useState } from "react"
import Hero from "../components/hero"
import Tile from "../components/tile"
import { trending, upcoming_show } from "../services/api";
import { useAuth } from "../context/AuthenContext";
import { CircularProgress } from "@mui/material";


function Home(){
    const {user} = useAuth();
    const [trends, setTrends] = useState({
      movies: [],
      tv_show: []
    });
    const [upComing, setUpComing] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const loadData = async ()=>{
            try{
                const movies_data = await trending("movie");
                const tvShow_data = await trending("tv")
                setTrends({
                  movies: movies_data,
                  tv_show: tvShow_data
                })

                const new_movies = await upcoming_show();
                setUpComing(new_movies)

                
            }catch(err){
                console.error(err.message)
            }finally{
              setLoading(false)
            }
        }
        loadData();
    },[])
     
    if(loading){
        return (
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <CircularProgress size="10rem" color="secondary"/>

          </div>
        );
    }else{
      return(
          <div className="snap-y scroll-smoot overflow-scroll h-screen w-full scrollbar-hide">
              <Hero/>

              <div className=" w-full px-10 py-15 snap-start snap-normal flex flex-col justify-evenly items-center gap-3">
                <Tile
                  title= "Trending Movies"
                  data={trends.movies}
                  isMovie={true}
                  
                />
                <Tile
                  title = "Trending Tv Shows"
                  data={trends.tv_show}
                  isMovie={false}
                />
                <Tile
                  title = "Upcoming"
                  data={upComing}
                />
              </div>

              <div className="border-4 h-screen w-full px-3  snap-start snap-normal flex flex-col justify-evenly items-center">
                
              </div>
              
          </div>
      )
    }
}

export default Home


