const express=require( 'express')
const connectDB=require("./config/db")
const User=require("./routes/api/users")
const Auth=require("./routes/api/auth")
const Profile=require("./routes/api/profile")
const Posts=require("./routes/api/posts")
const cors =require ("cors");
const app=express()

//connect DB
connectDB()
app.use(express.json({extended:false}))
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/',(req,res)=>{
    res.send("<h1>Hello</h1>")
})

app.use('/api/users',User)
app.use('/api/auth',Auth)
app.use('/api/profile',Profile)
app.use('/api/posts',Posts)

app.listen(8000,()=>{
    console.log("http://127.0.0.1:8000")
})