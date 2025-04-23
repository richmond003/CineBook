import { useEffect, useState } from "react"
import Hero from "../components/hero"
import Tile from "../components/tile"
import { trendingOnStream } from "../services/api"
import HeroCard from "../components/hero_card"

const images = [
    'placeholder1.jpg',
    'placeholder1.jpg',
    'placeholder1.jpg',
    'placeholder1.jpg',
    'placeholder1.jpg',
]

function Home(){
    const [streamTrends, setStreamTrends] = useState({
        netflix: [],
        prime: [],
        max: [],
        disney: []
    })




    // useEffect(()=>{
    //     const loadStreamTrends = async ()=>{
    //         try{
    //             const netflixData = await trendingOnStream("netflix");
    //             const prime_data = await trendingOnStream("prime");
    //             const max_data = await trendingOnStream("hbo");
    //             const disney_data = await trendingOnStream("disney")
    //             setStreamTrends({
    //                 netflix: netflixData,
    //                 prime: prime_data,
    //                 max: max_data,
    //                 disney: disney_data,
    //             })
    //             console.log("netflix: ", netflixData)
                
    //         }catch(err){
    //             console.error(err.message)
    //         }
    //     }
    //     loadStreamTrends();
    // },[])

    function clickEvent(){
        console.log(index)
    }

   

    return(
        <div className="snap-y scroll-smoot overflow-scroll h-screen w-full scrollbar-hide">
            <Hero/>

            <div className=" w-full px-5 py-15 snap-start snap-normal flex flex-col justify-evenly items-center gap-3">
              {/* <iframe
                title="Testing api video"
                width="500"
                height="500"
                className="border-4"
                src="https://www.youtube.com/embed/e0Y8KpQpW8c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              /> */}
              <Tile/>
              <Tile/>
            </div>

            <div className="border-4 h-screen w-full px-3  snap-start snap-normal flex flex-col justify-evenly items-center">

            </div>
            
        </div>
    )
}

export default Home