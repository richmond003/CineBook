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

// get Cast
export const getCast = async (show_type,id) => {
  const res = await fetch(`https://api.themoviedb.org/3/${show_type}/${id}/credits`, Header);
  const data = await res.json();
  return data.cast;
}

// get details
export const getDetails = async (show_type, id)=>{
  const res = await fetch(`https://api.themoviedb.org/3/${show_type}/${id}`, Header);
  const data = await res.json();
  return data;
}

// upcoming movies
export const upcoming_show = async ()=>{
  const res = await fetch("https://api.themoviedb.org/3/movie/upcoming", Header);
  const data = await res.json();
  return data.results;
}

// get trailer
export const getTrailer = async (media_type, id)=>{
  try{
      const res = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos`, Header);
      const data = await res.json();
      const videos = data.results;
      const trailer = await videos.find(item => item.type === "Trailer")?.key;
      console.log(trailer)
      return trailer;
  }catch(err){
    console.error(err.message)
  }
}

// get Images
export const getGallary =  async (media_type, id) =>{
  try{
      const res = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/images`, Header);
      const data = await res.json();
      return data;
  }catch(err){
    console.error(err.message)
  }
}

