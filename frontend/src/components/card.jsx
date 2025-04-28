import {ReactComponent as EyeIcon} from '../assets/eye_icon.svg'

function Card({data, clickListner, style}){
    return (
            // <div onClick={clickListner} className="relative border-4 h-60 w-45 overflow-hidden rounded-3xl transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            //     <img 
            //         src={`./images/${img}`} 
            //         alt={"placeholder"}
            //         className="h-full w-full object-cover"
            //     />
            //     <div className="z-40 absolute bottom-0  text-black">
            //         <p className="text-9xl text-start font-extrabold leading-none font-[Train-One] text-[#C0C0C0]">1</p>
            //     </div>
            // </div>
            <div onClick={clickListner} className={style || "border-2 rounded-xl h-35 w-55 overflow-hidden transition delay-90 duration-300 ease-in-out hover:-translate-y-1 hover:scale-109 hover:z-40"}>
                {/* <div className='h-[80%]'> */}
                    <img 
                        src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`} 
                        alt={data?.title || 'image placeholder'}
                        className="h-full w-full object-fill"
                    />
                {/* </div> */}
                {/* <div className="bg-black h-full flex-col justify-center items-center gap-2 p-1 px-2 text-xs">
                    <div className="border-2rm flex flex-row justify-between">
                        <div>{data?.title||"TITLE"}</div>
                        <div><EyeIcon className="h-5 w-5 fill-amber-300"/></div>
                    </div>
                
                    <div className="border-2rm flex flex-row justify-between">
                        <div>Year</div>
                        <div>Rating</div>
                    </div>
                    
                </div> */}
            </div>
    )
}

export default Card

// <div className="absolute bottom-0 left-0 z-40 w-full bg-white/70">
{/* <p className="text-[6rem] leading-none font-extrabold text-black pl-2">
1
</p> */}


