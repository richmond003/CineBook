

export default function Cast({data}){
   return(
    <>
        <div className="flex flex-row gap-3 items-center">
            <div className="h-20 w-20 rounded-full  overflow-hidden">
                <img
                    src="https://image.tmdb.org/t/p/original/bT3IpP7OopgiVuy6HCPOWLuaFAd.jpg"
                    className="h-full w-full object-cover"
                    alt="real name"
                />
            </div>
            <div className="flex flex-col">
                <h1>Character Name</h1>
                <h3 className="font-extralight">Real name</h3>
            </div>
        </div>
    </>
   )
}
