import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { createAccessToken, setTokenCookie, clearTokenCookie } from "../libs/utils/jwt.utils";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    if (req.user && req.user.memberType === "RESTAURANT") {
      res.redirect("/admin/dashboard");
    } else {
      res.redirect("/admin/login");
    }
  } catch (err) {
    console.log("Error, goHome:", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    if (req.user && req.user.memberType === "RESTAURANT") {
      return res.redirect("/admin/dashboard");
    }
    res.render("admin/login", { title: "Admin Login", page: "admin", error: null, formData: {} });
  } catch (err) {
    console.log("Error, getLogin:", err);
  }
};

restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    res.render("admin/signup", { title: "Admin Register", page: "admin", error: null, formData: {} });
  } catch (err) {
    console.log("Error, getSignUp:", err);
  }
};

restaurantController.getDashboard = async (req: Request, res: Response) => {
  try {
    const memberService = new MemberService();
    const members = await memberService.getMembers();
    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      page: "admin",
      member: req.user || null,
      members,
    });
  } catch (err) {
    console.log("Error, getDashboard:", err);
    res.status(500).send("Server error");
  }
};

restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body;
    const memberService = new MemberService();
    const member = await memberService.processLogin(input);
    if (member.membertype !== MemberType.RESTAURANT) {
      return res.render("admin/login", {
        title: "Admin Login", page: "admin",
        error: "This account is not a restaurant admin.",
        formData: req.body || {},
      });
    }
    const token = createAccessToken(member);
    setTokenCookie(res, token);
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log("Error, processLogin:", err);
    res.render("admin/login", {
      title: "Admin Login", page: "admin",
      error: (err as Error).message || "Login failed.",
      formData: req.body || {},
    });
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    const newMember: MemberInput = req.body;
    newMember.membertype = MemberType.RESTAURANT;
    const memberService = new MemberService();
    const member = await memberService.processSignup(newMember);
    const token = createAccessToken(member);
    setTokenCookie(res, token);
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.render("admin/signup", {
      title: "Admin Register", page: "admin",
      error: (err as Error).message || "Signup failed.",
      formData: req.body || {},
    });
  }
};

restaurantController.processLogout = (req: Request, res: Response) => {
  try {
    clearTokenCookie(res);
    res.redirect("/admin/login");
  } catch (err) {
    console.log("Error, processLogout:", err);
    res.status(500).send("Logout failed");
  }
};

export default restaurantController;