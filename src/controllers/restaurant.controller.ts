import {Request, Response} from 'express';
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput } from '../libs/types/member';
import { MemberType } from '../libs/enums/member.enum';

const restaurantController: T = {};

restaurantController.goHome = (req:Request, res:Response) => {
    try {
        console.log("goHome");
        res.send("Home page");
    } catch (err) {
        console.log("Eror, goHome", err)
    }
};  

restaurantController.getLogin = (req:Request, res:Response) => {
    try {
        console.log("getLogin"); 
        res.send("Login page");
    } catch (err) {
        console.log("Eror, login", err)
    }
}; 

restaurantController.getSignUp = (req:Request, res:Response) => {
    try {
        console.log("getSignUp"); 
        res.send("Signup page");
    } catch (err) {
        console.log("Eror, getSign", err)
    }
}; 

restaurantController.processLogin = (req:Request, res:Response) => {
    try {
        console.log("processLogin"); 
        res.send("DONE")
    } catch (err) {
        console.log("Eror, processLogin", err)
    }
}; 

restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup called");

        const newMember: MemberInput = req.body;
        newMember.membertype = MemberType.RESTAURANT;

        const memberService = new MemberService();
        const result = await memberService.processSignup(newMember);

        res.status(201).json(result); // ✅ Send JSON to Postman
    } catch (err: any) {
        console.error("Error, processSignup", err);
        res.status(500).json({ message: "Signup failed", error: err.message || err });
    }
};

export default restaurantController;