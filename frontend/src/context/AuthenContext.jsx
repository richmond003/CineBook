import {createContext, useContext, useState } from "react";
import { login, registerUser } from "../services/backend_api";


const AuthenContext = createContext();

export const AuthenProvider = ({children})=>{
    const [user, setUser] = useState(null)

    const signUpUser = async (userData) =>{
        const user = await registerUser(userData);
        console.log("sign up details from context: ", user)
        setUser(user);
        return user;
    }

    const loginUser = async (userData) => {
        const user = await login(userData);
        console.log("user from context: ", user)
        setUser(user);
        return user;
    };

    const logout = () =>{
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthenContext.Provider value={{user, signUpUser, loginUser, logout}}>
            {children}
        </AuthenContext.Provider>
    );
};

export const useAuth = () => useContext(AuthenContext);