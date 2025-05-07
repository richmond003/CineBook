import { Avatar } from "@mui/material";


export default function Cast({data}){
   return(
    <>
        <div className=" flex flex-row gap-2 items-center">
            {/* <div className="h-20 w-20 rounded-full overflow-hidden"> */}
                <Avatar
                    // src={`https://image.tmdb.org/t/p/original/${data.profile_path}` || "https://i.pinimg.com/736x/0f/68/94/0f6894e539589a50809e45833c8bb6c4.jpg"}
                    src={data.profile_path !== null? `https://image.tmdb.org/t/p/original/${data.profile_path}`: "https://i.pinimg.com/736x/0f/68/94/0f6894e539589a50809e45833c8bb6c4.jpg"}
                    // className="h-full w-full object-fill"
                    alt={data.name || "No Data"}
                    sx={{ width: 70, height: 70 }}
                />
            {/* </div> */}
            <div className="flex flex-col">
                <h1>{data.character || "No Data"}</h1>
                <h3 className="font-extralight">{data.name || "No Data"}</h3>
            </div>
        </div>
    </>
   )
}
