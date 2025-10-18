import {Request, Response} from 'express';
import {T} from "../libs/types/common";

// React

const memberController: T = {};

memberController.goHome = (req:Request, res:Response) => {;
    try {
        res.send("Home page");
    } catch (err) {
        console.log("Eror, goHome", err)
    }
};  

memberController.getLogin = (req:Request, res:Response) => {
    try {
        res.send("Login page");
    } catch (err) {
        console.log("Eror, login", err)
    }
}; 

memberController.getSignUp = (req:Request, res:Response) => {
    try {
        res.send("Signup page");
    } catch (err) {
        console.log("Eror, getSign", err)
    }
}; 

export default memberController;
