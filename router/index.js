
const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const tourRouter = require('./tour.router');
const locationRouter = require('./location.router');
const viewRouter = require('./view.router');

const Routers = [
  userRouter,
  tourRouter,
  locationRouter,
  viewRouter,

];
module.exports = (app)=>{

    Routers.map((router)=>{
        if (router === viewRouter) {
            app.use("/",router)
        }else{
            app.use("/api/v1", router);
        }
    })
};