import HeroCard from "./hero_card";

const images = Array.from({ length: 20 }, (_, i) => `placeholder${i+1}.jpg`);
function Tile({data, handClick}){
    return(
       <>
            <div className=" w-full flex flex-col justify-center gap-1">
                <div>TITLE</div>
                <div className="w-full border-t-2"></div>
                <div className="flex flex-row items-center gap-5 w-full h-full py-2 overflow-x-scroll scrollbar-hide">
                    {images.map((img, index)=>(
                        <div className="snap-start" key={index}>
                            <HeroCard  key={index} img={img} />
                        </div>
                    ))} 
                </div> 
            </div>
       </>
    );
}

export default Tile

// font-[Lexend-Medium] text-[1em] italic