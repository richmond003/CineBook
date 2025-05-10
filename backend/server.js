import express from 'express'
import cors from 'cors';
import nedb from "nedb-promises"; 
import bcrypt from "bcrypt";
import passport from 'passport';
import session from 'express-session';
import {Strategy} from 'passport-local'
import jwt from 'jsonwebtoken'
import env from "dotenv";
env.config()

const port = 5000;
const app = express();
const saltRounds = 10; 
const db = nedb.create('userData.jsonl'); 

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(cors({
    origin: 'http://localhost:5173', // only allow React dev server
    credentials: true // if using cookies
}));

app.get('/backend/server', (req, res)=>{
    console.log("Backend Started")
    res.json({
        user: "https://i.pinimg.com/736x/db/4c/3b/db4c3bb595c2220012b8b10f654eed6d.jpg",
        msg: "Hello world"
    })
})

// register new user or redirect existing email to 
app.post('/register', async (req, res)=>{
    try{
        const userData = req.body;
        console.log(userData)
        const {fname, lname, email, password} = userData;
        const existingUser = await db.findOne({email: email});
        console.log("Existing User: ",existingUser)
        if(!existingUser){
            bcrypt.hash(password, saltRounds, async function(err, hash){
                if(err){
                    console.log(err)
                }else{
                    const newUser = await db.insertOne({
                        fname: fname,
                        lname: lname,
                        email: email,
                        hpassword: hash,
                        acc_type: "local"
                    });
                    console.log("New User: ", newUser);
                }
            });
        }
    }catch(err){
        console.error(err.message)
    }
})

app.post('/login', (req, res, next)=>{
    passport.authenticate('local', {session: false}, (err, user, info)=>{
        if (err) return next(err);
        if(!user) return res.status(401).json({message: info?.message || 'Login failed'});

         //if login sucessfull
        const token = jwt.sign({sub: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({
            message: 'Login sucess', 
            token, 
            user: {email: user.email, fname: user.fname}
        });
    })(req, res, next)
})

//Local passport configuration
passport.use('local', new Strategy( {
    usernameField: 'email', 
    passwordField: 'password' 
    },

    async function verify(username, password, done){
    console.log("username: ", username)
    console.log("password: ", password)
    try{
        const user = await db.findOne({email: username});
        console.log(user)
        if(!user || !bcrypt.compareSync(password, user.hpassword)){
            return done(null, false, {message: "Invalid Credentials"})
        }else{
            done(null, user)
        }
    }catch(err){
        console.error(err.message)
    }
}))

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((user, done)=>{
    done(null, user)
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})