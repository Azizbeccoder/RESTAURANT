import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { createAccessToken, setTokenCookie, clearTokenCookie } from "../libs/utils/jwt.utils";

// Plain object — no TypeScript type issues with property access
const memberController = {

  goHome: (req: Request, res: Response) => {
    try {
      res.render("home", { title: "Home", page: "home", member: req.user || null });
    } catch (err) {
      console.log("Error, goHome:", err);
      res.status(500).send("Server error");
    }
  },

  getLogin: (req: Request, res: Response) => {
    try {
      res.render("login", { title: "Log In", page: "login", error: null, formData: null });
    } catch (err) {
      console.log("Error, getLogin:", err);
    }
  },

  getSignUp: (req: Request, res: Response) => {
    try {
      res.render("signup", { title: "Sign Up", page: "signup", error: null, formData: null });
    } catch (err) {
      console.log("Error, getSignUp:", err);
    }
  },

  processLogin: async (req: Request, res: Response) => {
    try {
      const input: LoginInput = req.body;
      const memberService = new MemberService();
      const member = await memberService.processLogin(input);

      const token = createAccessToken(member);
      setTokenCookie(res, token);

      res.redirect("/");
    } catch (err) {
      console.log("Error, processLogin:", err);
      res.render("login", {
        title: "Log In",
        page: "login",
        error: (err as Error).message || "Login failed.",
        formData: req.body,
      });
    }
  },

  processSignup: async (req: Request, res: Response) => {
    try {
      const newMember: MemberInput = req.body;
      newMember.membertype = MemberType.USER;

      const memberService = new MemberService();
      const member = await memberService.processSignup(newMember);

      const token = createAccessToken(member);
      setTokenCookie(res, token);

      res.redirect("/");
    } catch (err) {
      console.log("Error, processSignup:", err);
      res.render("signup", {
        title: "Sign Up",
        page: "signup",
        error: (err as Error).message || "Signup failed.",
        formData: req.body,
      });
    }
  },

  processLogout: (req: Request, res: Response) => {
    try {
      clearTokenCookie(res);
      res.redirect("/login");
    } catch (err) {
      console.log("Error, processLogout:", err);
      res.status(500).send("Logout failed");
    }
  },

  getUsers: async (req: Request, res: Response) => {
    try {
      const memberService = new MemberService();
      const members = await memberService.getMembers();
      res.render("users", { title: "Members", page: "users", member: req.user || null, members });
    } catch (err) {
      console.log("Error, getUsers:", err);
      res.render("users", { title: "Members", page: "users", member: req.user || null, members: [] });
    }
  },

  getProducts: (req: Request, res: Response) => {
    try {
      res.render("products", { title: "Menu", page: "products", member: req.user || null, products: [] });
    } catch (err) {
      console.log("Error, getProducts:", err);
    }
  },

};

export default memberController;