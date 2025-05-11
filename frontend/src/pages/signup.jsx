import TextFieldComponent, { PasswordField } from "../components/text_field";
import { Button, Divider } from "@mui/material";
import {ReactComponent as Google} from "../assets/google.svg"
import { useNavigate } from "react-router";
import {useState } from "react";
import { useAuth } from "../context/AuthenContext";


function SignUp(){
    const {signUpUser} = useAuth();
    const navigate = useNavigate();
    const [passwordMixmatch, setPasswordMixmatch] = useState(false)
    const [passwordHelper, setPasswordHelper] = useState("")
    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        cPassword: ""
    })

   

    // handle user inputs changes
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserData(prev => ({...prev, [name]:value}))
    }

    //handle submit and sending data over to backend
    const handleSubmit = async (e) => {
       try{
        e.preventDefault();
        if(userData.password !== userData.cPassword){
            setPasswordMixmatch(true);
            setPasswordHelper("Password did not match")
        }else{
            console.log("working")
            const user = await signUpUser(userData);
            console.log("user at handle", user);
            if(user.sucess){
                navigate('/')
            }
        }

       }catch(err){
        console.error(err.message)
       }
    }

    return(
        <>
            <div className="h-screen w-screen border-4 overflow-hidden place-content-center place-items-center">
               <div className="border-4 border-amber-200 h-150 - w-300 flex flex-row">
                    <div className="border-4 border-green-500 h-full w-[40%] ">
                        <div className="border-4 h-full flex flex-col justify-center items-center gap-5 mx-7">
                            <div>Sign Up</div>
                                <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4 w-full"
                                >
                                    <TextFieldComponent
                                        name={"fname"}
                                        label={"Frist Name"}
                                        onChange={handleChange}
                                        value={userData.fname}
                                    />
                                    <TextFieldComponent
                                        name={"lname"}
                                        label={"Last Name"}
                                        required={false}
                                        onChange={handleChange}
                                        value={userData.lname}
                                    />
                                    <TextFieldComponent
                                        name={"email"}
                                        label={"Email"}
                                        placeholder={"name@example.com"}
                                        type={"email"}
                                        onChange={handleChange}
                                        value={userData.email}
                                    />
                                    <PasswordField
                                        name={"password"}
                                        helperText={passwordHelper}
                                        label={"Password"}
                                        error={passwordMixmatch}
                                        onChange={handleChange}
                                        value={userData.password}
                                    />
                                    <PasswordField
                                        name={"cPassword"}
                                        helperText={passwordHelper}
                                        label={"Confirm Password"}
                                        error={passwordMixmatch}
                                        onChange={handleChange}
                                        value={userData.cPassword}
                                    />
                                    <Button 
                                        type="submit"
                                        variant="contained" 
                                        color="secondary" 
                                        size="large"
                                        sx={{marginX: '10px'}}
                                    >Sign Up</Button>
                                    <div className="mt-5">
                                        <Divider
                                            color= "white"
                                            sx={{
                                                borderColor: 'white',
                                                color: 'white',
                                                '&::before, &::after': {
                                                    borderColor: 'white'
                                                }
                                            }}
                                        >OR</Divider>
                                    </div>

                                    <div className="w-full place-items-center mt-2">
                                        <Google className="h-10 w-10 cursor-pointer"/>
                                    </div>

                                </form>

                        </div>
                    </div>

                    <div className="border-4 border-sky-500 w-[60%] h-full place-content-center place-items-center">
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
                                    onClick={()=> navigate("/login")}
                                >Sign Up</Button>
                            </div>

                        </div>
                    </div>
               </div>
            </div>
        </>
    )
}

export default SignUp