import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import Tile from "../components/tile";
import { genreShows } from "../services/api";

function Movies(){
    const [genreMovies, setgenreMovies] = useState([])
    useEffect(()=>{
        const loadData = async ()=>{
            try{
               const data = await genreShows('movie')
               setgenreMovies(data);
            }catch(err){
                console.error(err)
            }
        }
        loadData();
    }, [])
    return (
        <div className="w-full flex flex-col px-10">
            <div className="flex flex-col items-center justify-center gap-3">
                {
                    genreMovies.map((item, index)=>(
                        <Tile
                            key={index}
                            title={item.name}
                            data = {item.data}
                            isMovie={true}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Movies