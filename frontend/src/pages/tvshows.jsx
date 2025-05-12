import { useEffect, useState } from "react"
import NavBar from "../components/navbar"
import { genreShows } from "../services/api"
import Tile from "../components/tile"

function TvShows(){
    const [genreTvShows , setGenreTvShows] = useState([])
    useEffect(()=>{
        const loadData = async ()=>{
            try{
                const data = await genreShows('tv')
                setGenreTvShows(data)
            }catch(err){
                console.error(err)
            }
        }
        loadData();
    }, [])

    return (
        <div className=" flex flex-col px-10">
            <div className="flex flex-col items-center justify-center gap-3">
                {
                    genreTvShows.map((item, index)=>(
                        <Tile
                            key={index}
                            title={item.name}
                            data={item.data}
                            isMovie={false}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default TvShows