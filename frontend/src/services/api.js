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

// Get All Trending Today
export const trending = async ()=>{
  const res = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', Header);
  const data = await res.json();
  return data.results;
}

// Get All TypeBased
export const movies = async (type)=>{
  const res = await fetch(`https://api.themoviedb.org/3/discover/${type}`, Headers);
  const data = await  res.json();
  return data.results;
}





// get popular a streaming services
export const getPopular = async () => {
    try {
      const res = await fetch("https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&order_by=popularity_1year", headers);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

// get all show based on show type
export const getAllShow = async(show_type)=>{
    try{
        const res = await fetch(`https://streaming-availability.p.rapidapi.com/shows/search/filters?show_type=${show_type}&country=us`, headers);
        const data = await res.json();
        return data;
    }catch(err){
        console.error(err.message)
    }
}

//get trending based on streaming service
export const trendingOnStream = async (stream) => {
    try{
      const res = await fetch(`https://streaming-availability.p.rapidapi.com/shows/top?country=us&service=${stream}`, headers);
      const data = await res.json();
      return data;

    }catch(err){
      console.error(err.message)
    }
}

// filter by genre
export const getBasedOnGenre = async (genre)=>{
  try{
    const res = await fetch(`https://streaming-availability.p.rapidapi.com/shows/search/filters?genres=${genre}`, headers);
    const data = await res.json();
    return data;
  }catch(err){
    console.error(err.message)
  }
}

// get all genre 
export const getAllGenre = async ()=>{
  try{
    const res = await fetch('https://streaming-availability.p.rapidapi.com/genres?output_language=en', headers);
    const data = await res.json();
    return data;
  }catch(err){
    console.error(err.message)
  }
}

// search based on a keyword
export const searchKeyword = async (keyword)=>{
  try{
      const res = await fetch(`https://streaming-availability.p.rapidapi.com/shows/search/filters?keyword=${keyword}`, headers);
      const data = await res.json();
      return data;
  }catch(err){
    console.error(err.message)
  }
}