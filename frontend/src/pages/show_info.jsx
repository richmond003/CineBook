import Cast from "../components/cast";
import DropdownButton from "../components/dropdown_button";
import {ReactComponent as EyeIcon} from '../assets/eye_icon.svg'
import Card from "../components/card";

function Show(){
    const data = ['Trailers', 'Season 1', 'Season 2'];
    return (
        <>
            <div className="relative border-6 border-red-500 h-screen w-screen  flex flex-col justify-start">
                <div className="h-full w-full sm:grid sm:grid-cols-5 justify-evenly">
                    <div className="border-4 border-amber-950 col-span-3">   
                            IFRAME   
                    </div>
                    <div className="border-4 border-amber-300 col-span-2">
                        overview
                    </div>
                </div>

                <div className="absolute bottom-0 border-amber-400 w-full flex flex-col z-40 pb-2">
                    <div className="pl-2"><DropdownButton options={data}/></div>
                    <div className="border-pink-400 flex flex-row gap-2 overflow-x-scroll scrollbar-hide ">
                        {
                            [...Array(5)].map((_, i)=>(
                                <div className="border-4 h-full">
                                    <div className=" w-75 h-40">
                                        {i+1}
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
               
            </div>
            <div className="border-lime-400 border-4 flex flex-col  w-full px-5 gap-10">
                <div className="border-blue-500 w-full flex flex-row justify-center mt-20 gap-5">
                    <div className="border-amber-300 flex flex-col  justify-between ">
                        <div className="border-4 h-60 w-50">
                            cover image
                        </div>

                        <div className="border-4 h-12">

                        </div>
                        <div className="border-4 h-12">

                        </div>
                        <div className="border-4 h-12">

                        </div>

                    </div>

                    <div className="flex flex-col border-cyan-400 basis-4xl gap-3 ">
                        <h1 className="text-4xl font-extrabold">TITLE</h1>
                        <hr/>
                        <div className="flex flex-row gap-5">
                            <div className="flex flex-row gap-2 justify-center items-center">
                                 <EyeIcon className="h-5 w-5"/>
                                 <span>20000</span>
                            </div>
                            |
                            <div>stars</div>
                            |
                            <div>1h 30min</div>
                            |
                            <div>2017</div>
                        </div>
                        <hr/>
                        <div className="flex flex-row justify-between">
                            <div className=" w-[50%] flex flex-col gap-3">
                                <h1>DETAILS</h1>
                                <div>
                                    <div>Director: <span>Name</span></div>
                                    <div>Writer: <span>Name</span></div>
                                    <div>Country: <span>Name</span></div>
                                    <div>Language: <span>Name</span></div>
                                    <div>Release Date: <span>Name</span></div>
                                </div>
                            </div>
                            <div className="w-[50%] flex flex-col gap-3"> 
                                GENRES
                                <ul>
                                    <li>Genre 1</li>
                                    <li>Genre 2</li>
                                    <li>Genre 3</li>
                                    <li>Genre 4</li>
                                </ul>
                            </div>
                        </div>

                        <hr/>
                        <div>
                            STORYLINE
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet optio illum ullam. Eos commodi assumenda corporis similique voluptatum animi dolor et eveniet ipsa itaque, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus dicta repellat tenetur ipsum officia aut, error, aliquid aspernatur doloribus et est perferendis. Doloribus hic voluptatem iusto itaque exercitationem veniam labore!dolorem maiores doloribus iure recusandae labore.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">Cast</h1>
                    <div className="flex flex-row gap-3">
                    {[...Array(5)].map((_,i)=>(
                        <Cast/>
                    ))}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">Recommendations</h1>
                    <div className="flex flex-row gap-4 overflow-x-scroll scrollbar-hide">
                        {
                            [...Array(10)].map((_, i)=>(
                                <div>
                                    <Card/>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Show


/* 


*/