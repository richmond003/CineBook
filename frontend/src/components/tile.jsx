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
                <div className="text-2xl text-purple-500 font-extrabold">{title ||"TITLE"}</div>
                <hr className="text-purple-500"/>
                <div className=" border-amber-200 flex flex-row gap-3 w-full py-3 overflow-x-scroll overflow-y-hidden scrollbar-hide">
                    {(data||[...Array(5)]).map((movie, index)=>(
                        <div className="snap-start z-40" key={index}>
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