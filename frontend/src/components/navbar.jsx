import { Link } from "react-router-dom";
import {ReactComponent as Search} from '../assets/icons8-search-100.svg';

function NavBar({style}){
    return(
        <nav className={style ||"w-full "}>

            <div className="flex flex-row items-center justify-between  gap-[2rem] px-10 pt-1">
                <div>LOGO IMAGE</div>

                <div className="flex flex-row gap-7">
                    <Link className="text-[1rem]" to="/">HOME</Link>
                    <Link to="/movies">MOVIES</Link>
                    <Link to="/tv_shows">TV SHOWS</Link>
                    <Link to="/list">My List</Link>
                </div>

                <div className="flex flex-row gap-7 items-center justify-center">
                    <div><Search className=" w-7 h-7 fill-white"/></div>
                    <div className="h-10 w-10 rounded-full border-2 overflow-hidden">
                        <img 
                            src="https://image.tmdb.org/t/p/original/bT3IpP7OopgiVuy6HCPOWLuaFAd.jpg"
                            className="h-full w-full object-cover "
                        />
                    </div>
                </div>

            </div>

            


        </nav>
    )
}

export default NavBar