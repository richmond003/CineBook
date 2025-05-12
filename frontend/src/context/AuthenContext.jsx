import {createContext, useContext, useEffect, useState } from "react";
import { deleteAcc, login, registerUser } from "../services/backend_api";


const AuthenContext = createContext();

export const AuthenProvider = ({children})=>{
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem("token");
        console.log("ctx: ",token)
        if (token) {
            fetch("http://localhost:5000/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then(res => res.json())
              .then(data => {
                if (data) {
                  setUser(data);
                  console.log("✅ [Frontend] Profile fetched:", data.user);
                }
              })
              .catch(() => {
                console.warn("❌ [Frontend] Token invalid or expired");
                localStorage.removeItem("token");
              });
          }
    }, []);

    const signUpUser = async (userData) =>{
        const data = await registerUser(userData);
        console.log("sign up details from context: ", data)
        setUser(data);
        return data;
    }

    const loginUser = async (userData) => {
        const data = await login(userData);
        console.log("user from context: ", data)
        setUser(data);
        return data;
    };

    const logout = () =>{
        localStorage.removeItem('token')
        setUser(null)
    }

    const deleteUser = async (userData) =>{
        const data = await deleteAcc(userData)
        localStorage.removeItem('token');
        setUser(null);
        return data;
    }

    return (
        <AuthenContext.Provider value={{user, signUpUser, loginUser, logout, deleteUser}}>
            {children}
        </AuthenContext.Provider>
    );
};

export const useAuth = () => useContext(AuthenContext);