import axios from 'axios'

// get user profile
export const getProfile = async () =>{
    try{
      const res = await fetch("http://localhost:5000/backend/server");
      const data = await res.json();
      return data;
    }catch(err){
      console.error(err.message)
    }
  }

// register User
export const registerUser = async (userData)=>{
    try{
        const res = await axios.post("http://localhost:5000/register", userData)
        const data = res.data;
        return data;
    }catch(err){
        console.error(err.message)
    }
}


  