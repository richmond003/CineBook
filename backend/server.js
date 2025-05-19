import express from 'express'
import cors from 'cors';
import nedb from "nedb-promises"; 
import bcrypt from "bcrypt";
import passport from 'passport';
import session from 'express-session';
import { Strategy } from 'passport-local'
import jwt from 'jsonwebtoken'
import env from "dotenv";
import cookieParser from 'cookie-parser';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
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
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
    origin: 'http://localhost:5173', // only allow React dev server
    credentials: true // if using cookies
}));

app.get('/backend/server', (req, res)=>{
    console.log("Backend Started")
    
})

app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    try{
        // passport sets req.user if token is valid
        res.json({
        message: 'Profile data fetched successfully',
        user: {
            fname: req.user.fname,
            email: req.user.email,
        },
        });
    }catch(err){
        console.error('Error from profile: ',err)
    }
});

// register new user or redirect existing email to 
app.post('/register', async (req, res)=>{
    try{
        const userData = req.body;
        console.log(userData)
        const {fname, lname, email, password} = userData;
        const currentUser = await db.findOne({email: email});
        if(!currentUser){
            // if user doesn't already exist
            bcrypt.hash(password, saltRounds, async function(err, hash){
                if(err){
                    console.log(err)
                }else{
                    const newUser = await db.insertOne({
                        fname: fname.charAt(0).toUpperCase() + fname.slice(1),
                        lname: lname.charAt(0).toUpperCase() + lname.slice(1),
                        email: email,
                        hpassword: hash,
                        acc_type: "local"
                    });
                    console.log("New User: ", newUser);
                    res.send({
                        message: "Sucessfully registered", 
                        sucess: true,
                        user: {email: newUser.email, fname: newUser.fname}
                    });
                }
            });
           
        }else{
            console.log("Existing User: ", currentUser)
            res.json({
                message: "Account already exist",
                sucess: false
            })
        }
    }catch(err){
        console.error(err.message)
    }
});


// login post route
app.post('/login', (req, res, next)=>{
    try{
    passport.authenticate('local', {session: false}, (err, user, info)=>{
        // console.log("user: ", user);
        // console.log("Info: ", info)
        if (err) {
            console.error("Error during authen", err)
            return next(err)
        };
        if(!user) { 
            return res.status(401).json({
                message: info?.message || 'Login failed',
                sucess: false
            }) 
        };
         //if login sucessfull
        const token = jwt.sign({sub: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({
            message: 'Login sucess', 
            sucess: true,
            token, 
            user: {email: user.email, fname: user.fname, favorite: user.showIds || []}
        });
        // cookie resouce
        res.cookie("token", token, {
            httpOnly: true, // can be accessed via js
            secure: false, // true during production with HTTPS
            sameSite: "lax",
            maxAge: 100// maxAge
        })
    })(req, res, next);
    }catch(err){
        console.error("Error from login", err)
    }
});

app.put("/addtolist", async (req, res)=>{
    try{
        const {email, id, showType}= req.body;
        const oldIds = await db.findOne({email: email});
        const updatedIds = [...(oldIds.showIds || []), {showId: id, idType: showType}]
        const result = await db.update(
            {email: email},
            {$set: {showIds: updatedIds}}
        );
        if(result){
            const user = await db.findOne({email: email});
            const showIds = user?.showIds || [];
            res.json({idsData: showIds})
        }     
    }catch(err){
        console.log(err)
    }
});

app.delete('/remove_favorite', async (req, res)=>{
    try{
        const {email, id, showType} = req.body;
        const oldIds = await db.findOne({email: email});
        const fiteredIds = (oldIds.showIds || []).filter(item => !(item.showId === id && item.idType === showType));
        const result = await db.update(
            {email: email},
            {$set: {showIds: fiteredIds}}
        )
        if(result){
            const user = await db.findOne({email: email});
            const showIds = user?.showIds || [];
            res.json({idsData: showIds})
        }
    }catch(err){
        console.log(err)
    }
})

//Local passport configuration
passport.use('local', new Strategy( {
    usernameField: 'email', 
    passwordField: 'password' 
    },
    async function verify(email, password, done){
    console.log("email: ", email)
    console.log("password: ", password)
    try{
        const user = await db.findOne({email: email});
        console.log(user)
        if(!user || !bcrypt.compareSync(password, user.hpassword)){
            return done(null, false, {message: "Invalid Credentials"})
        }else{
            done(null, user)
        }
    }catch(err){
        console.error(err.message)
    }
}));

// JWT Strategy configuration
passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET, // same as used when signing token
      },
      async (payload, done) => {
        try {
          const user = await db.findOne({ _id: payload.sub });
          if (user) return done(null, user);
          return done(null, false);
        } catch (err) {
          return done(err, false);
        }
      }
    )
);

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((user, done)=>{
    done(null, user)
})


app.delete('/delete', async (req, res)=>{
    try{
       const {email} = req.body;
       if(email){
        const result = await db.remove({email: email});
        if (result){
            res.json({
                sucess: true,
                message: "Account sucessfully deleted"
            })
        }else{
            res.json({
                message: "An error occured",
                sucess: false
            })
        }
       }else{
        res.status(401).json({message: "Invalid data"})
       }
    }catch(err){
        console.log(err.message)
    }
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})