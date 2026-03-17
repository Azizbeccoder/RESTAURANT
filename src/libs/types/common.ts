import { Request, Response } from "express";

// This type exactly matches your memberController properties
export type T = {
  goHome: (req: Request, res: Response) => void;
  getLogin: (req: Request, res: Response) => void;
  getSignup: (req: Request, res: Response) => void;
};
