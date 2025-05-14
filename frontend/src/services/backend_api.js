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
        const data = await res.data;
        return data;
    }catch(err){
        console.error(err.message)
    }
}

// login user
export const login = async (userData)=>{
    try{
        const res = await axios.post("http://localhost:5000/login", userData);
        const data = res.data;
        // console.log('res', res.status)
        console.log("data r at frontend: ",data);
        console.log("response status: ", res.status)
        console.log("token", data.token)
        localStorage.setItem('token', data.token) //store JWT
        return data;
    }catch(err){
        console.error(err.message)
    }
}

// delete user account
export const deleteAcc = async (userData)=>{
    try{
        const res = await axios.delete("http://localhost:5000/delete", {
            data: userData
        });
        const data = res.data;
        return data;
    }catch(err){
        console.error(err)
    }
}

// add review
export const addToList = async (userData) => {
    try{
        const res = await axios.put("http://localhost:5000/addtolist",  userData);
        const data = res.data;
        return data;
    }catch(err){
        console.error(err)
    }
}

export const removeFromList = async (userData) => {
     try{
        const res = await axios.delete("http://localhost:5000/remove_favorite",  {
            data: userData
        });
        const data = res.data;
        return data;
    }catch(err){
        console.error(err)
    }
}