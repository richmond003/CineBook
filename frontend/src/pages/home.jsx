import { useEffect, useState } from "react"
import Hero from "../components/hero"
import Tile from "../components/tile"
import { trending } from "../services/api";


function Home(){
    const [trends, setTrends] = useState({
      movies: [],
      tv_show: []
    });

    useEffect(()=>{
        const loadTrends = async ()=>{
            try{
                const movies_data = await trending("movie");
                const tvShow_data = await trending("tv")
                setTrends({
                  movies: movies_data,
                  tv_show: tvShow_data
                })

                
            }catch(err){
                console.error(err.message)
            }
        }
        loadTrends();
    },[])
     

    return(
        <div className="snap-y scroll-smoot overflow-scroll h-screen w-full scrollbar-hide">
            <Hero/>

            <div className=" w-full px-5 py-15 snap-start snap-normal flex flex-col justify-evenly items-center gap-3">
              <Tile
                title= "Trending Movies"
                data={trends.movies}
                
              />
              <Tile
                title = "Trending Tv"
                data={trends.tv_show}
              />
              <Tile
                title = "New Release"
              />
            </div>

            <div className="border-4 h-screen w-full px-3  snap-start snap-normal flex flex-col justify-evenly items-center">
              
            </div>
            
        </div>
    )
}

export default Home


 {/* <iframe
                title="Testing api video"
                width="500"
                height="500"
                className="border-4"
                src="https://www.youtube.com/embed/e0Y8KpQpW8c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              /> */}