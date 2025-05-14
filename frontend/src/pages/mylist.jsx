import { useEffect, useState } from "react";
import Card from "../components/card";
import { useAuth } from "../context/AuthenContext";
import { getDetails } from "../services/api";

function MyList(){
    const {favorite} = useAuth();
    const [userFav, setUserFav] = useState([])
    console.log("fav: ", favorite)
    useEffect(()=>{
        const loadData = async ()=>{
            try{
                const allFavData =await Promise.all(
                    favorite.map(async (item)=>{
                        const data = await getDetails(item.idType,item.showId);
                        return data
                    })
                );
                setUserFav(allFavData)
            }catch(err){
                console.error(err)
            }
        }
        loadData();
    }, [favorite])
    if(!favorite || favorite.length === 0){
        return (
            <div 
                className="h-screen w-screen flex flex-col justify-center items-center font-bold  text-5xl text-purple-500"
            >No items to display</div>
        )
    }else{
        return (
            <>
                 <div className="w-screen pt-15 px-5  gap-4 flex flex-wrap items-center justify-evenly">
                    {userFav.map((itemData, index)=>(
                        <Card
                            key={index}
                            data={itemData}
                        />
                    ))}
                </div>
            </>
        );
    }
  
}

export default MyList