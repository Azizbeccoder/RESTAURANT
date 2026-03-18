import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";
import { Member } from "../types/member";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../types/config";

export interface TokenPayload {
  _id: string;
  memberNick: string;
  memberType: string;
  memberStatus: string;
  iat?: number;
  exp?: number;
}

export const createAccessToken = (member: Member): string => {
  const payload: TokenPayload = {
    _id: member._id.toString(),
    memberNick: member.memberNick,
    memberType: member.membertype,
    memberStatus: member.memberStatus,
  };

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearTokenCookie = (res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const extractToken = (req: Request): string | null => {
  if (req.cookies?.token) return req.cookies.token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) return authHeader.slice(7);
  return null;
};