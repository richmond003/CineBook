const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const STREAM_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const BearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN

const Base_URL = "https://api.themoviedb.org/3";
// const headers = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-RapidAPI-Key': STREAM_API_KEY,
//       'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//     }
// }

const Header = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': BearerToken
  }
}



export const getPopularMovies = async () => {
    const res = await fetch(`${Base_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}

// Get top rated
export const topRated = async ()=>{
  const res = await fetch('https://api.themoviedb.org/3/movie/top_rated', Header);
  const data = await res.json();
  return data.results;
}

// Get Todays trends
export const trending = async (type)=>{
  const res = await fetch(`https://api.themoviedb.org/3/trending/${type||'all'}/day?language=en-US`, Header);
  const data = await res.json();
  return data.results;
}

// Get All TypeBased
export const movies = async (type)=>{
  const res = await fetch(`https://api.themoviedb.org/3/discover/${type}`, Headers);
  const data = await  res.json();
  return data.results;
}

// get show credits 
export const getDetails = async (showId) =>{
  const res = await fetch(`https://api.themoviedb.org/3/movie/${showId}/credits`, Headers);
  const data = await res.json();
  return data.cast;
}
