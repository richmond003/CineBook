import { Button, Divider} from "@mui/material"
import TextFieldComponent, {PasswordField} from "../components/text_field"
import {ReactComponent as Google} from "../assets/google.svg"
import { data, useNavigate } from "react-router"
import { useState } from "react";
import { login } from "../services/backend_api";
import { useAuth } from "../context/AuthenContext";


function Login(){
    const navigate = useNavigate();
    const {loginUser} = useAuth();
    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    })

    // handle user inputs changes
    const hanleChange = (e)=>{
        const {name , value} = e.target;
        setUserInput(preValue => ({...preValue, [name]: value}))
    }

    // handle user subbmission
    const handleSubmit = async (e)=>{
        try{
            e.preventDefault();
            const user = await loginUser(userInput)
            if(user.sucess){
                setUserInput(() => ({email: "", password: ""}));
                navigate('/');
            }
        }catch(err){
            console.error(err.message)
        }
        
    }

    return(
        <>
            <div className="border-4 h-screen w-screen overflow-hidden place-content-center place-items-center">
                <div className="border-4 border-red-400 h-150 w-300 flex flex-row">

                    <div className="border-4 h-full w-[60%] place-content-center place-items-center">
                        <div className="border-4 flex flex-col justify-center items-center gap-10">
                            <div className="flex flex-col justify-center items-center gap-5">
                                <div>Hey There!</div>
                                <div>
                                    <span>Welcome Back.</span>
                                    <span>You are just one step away to your feed.</span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center gap-2">
                                <p>Don't have an account?</p>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={()=> navigate("/signup")}
                                >Sign Up</Button>
                            </div>

                        </div>
                    </div>

                    <div className="w-[40%] border-4 border-amber-300">
                        <div className="border-4 h-full flex flex-col justify-center items-center gap-5 mx-7">
                            <div>Log In</div>
                            <form 
                                className="flex flex-col gap-4 w-full"
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                
                            >
                                <TextFieldComponent
                                    name={"email"}
                                    label={"Email"}
                                    placeholder={"name@example.com"}
                                    type={"email"}
                                    onChange={hanleChange}
                                    value={userInput.email}
                                />
                                <PasswordField
                                    name={"password"}
                                    label={"Password"}
                                    onChange={hanleChange}
                                    value={userInput.password}
                                />
                                {/* <div className="border-4 w-full"> */}
                                    <Button 
                                        type="submit"
                                        variant="contained" 
                                        color="secondary" 
                                        size="large"  
                                        sx={{marginX: '10px'}}
                                    >Log In</Button>
                                {/* </div>     */}
                                <div className="mt-5">
                                    <Divider 
                                        color="white"
                                        sx={{
                                            borderColor: 'white', // sets the line color
                                            color: 'white',        // sets the text color
                                            '&::before, &::after': {
                                                borderColor: 'white', // sets the horizontal line color around the text
                                            },
                                        }}
                                    >OR</Divider>
                                </div>

                                <div className="w-full place-items-center mt-2">
                                    <Google className="h-10 w-10 cursor-pointer"/>
                                </div>
                            </form>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login