const express= require("express");
const main =require("./configs/db");
const cors =require("cors");
const userRouter =require("./Routes/user");
const bookRouter = require("./Routes/book");

const app= express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("BookStore App");
})

app.use("/users", userRouter);

app.use("/api",bookRouter);


app.listen(8080,()=>{

    main();
    console.log("Server is running on port 8080");
})