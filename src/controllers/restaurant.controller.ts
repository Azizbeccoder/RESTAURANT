import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import {
  createAccessToken,
  setTokenCookie,
  clearTokenCookie,
} from "../libs/utils/jwt.utils";

const restaurantController: T = {};

// GET /admin/
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Admin Home page");
  } catch (err) {
    console.log("Error, goHome:", err);
  }
};

// GET /admin/login
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Admin Login page");
  } catch (err) {
    console.log("Error, getLogin:", err);
  }
};

// GET /admin/signup
restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    res.send("Admin Signup page");
  } catch (err) {
    console.log("Error, getSignUp:", err);
  }
};

// POST /admin/login
restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body;
    const memberService = new MemberService();
    const member = await memberService.processLogin(input);

    const token = createAccessToken(member);
    setTokenCookie(res, token);

    res.json({ member, token });
  } catch (err) {
    console.log("Error, processLogin:", err);
    res.status(400).json({ message: (err as Error).message || "Login failed" });
  }
};

// POST /admin/signup
restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    const newMember: MemberInput = req.body;
    newMember.membertype = MemberType.RESTAURANT;

    const memberService = new MemberService();
    const member = await memberService.processSignup(newMember);

    const token = createAccessToken(member);
    setTokenCookie(res, token);

    res.json({ member, token });
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.status(400).json({ message: (err as Error).message || "Signup failed" });
  }
};

// POST /admin/logout
restaurantController.processLogout = (req: Request, res: Response) => {
  try {
    clearTokenCookie(res);
    res.json({ message: "Admin logged out successfully" });
  } catch (err) {
    console.log("Error, processLogout:", err);
    res.status(500).json({ message: "Logout failed" });
  }
};

export default restaurantController;
