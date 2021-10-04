const express= require("express");

const app = express();

const router = require('./router/index');
const path = require("path")
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));


router(app);

app.listen(3000,()=>{
    console.log("connect ok");
})