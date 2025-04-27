import { useNavigate } from "react-router-dom";
import Card from "./card";

function Tile({data,title,}){
    const navigate = useNavigate();
    function functest(index){
        console.log(index)
    }
    return(
       <>
            <div className=" w-full flex flex-col justify-center gap-2">
                <div>{title ||"TITLE"}</div>
                <hr/>
                <div className="flex flex-row items-center gap-5 w-full h-full py-2 overflow-x-scroll overflow-y-hidden scrollbar-hide">
                    {(data||[...Array(5)]).map((movie, index)=>(
                        <div className="snap-start" key={index}>
                            <Card  
                                key={index}
                                data={movie} 
                                clickListner={()=> navigate(`/info/${index}`)} 
                            />
                        </div>
                    ))} 
                </div> 
            </div>
       </>
    );
}

export default Tile

// font-[Lexend-Medium] text-[1em] italic