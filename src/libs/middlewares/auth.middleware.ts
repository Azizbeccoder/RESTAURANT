import { Request, Response, NextFunction } from "express";
import { extractToken, verifyToken, TokenPayload } from "../utils/jwt.utils";
import { MemberStatus, MemberType } from "../enums/member.enum";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = extractToken(req);

  if (!token) {
    res.status(401).json({ message: "Authentication required. Please log in." });
    return;
  }

  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    return;
  }

  if (payload.memberStatus === MemberStatus.BLOCKED) {
    res.status(403).json({ message: "Your account has been blocked." });
    return;
  }

  if (payload.memberStatus === MemberStatus.DELETE) {
    res.status(403).json({ message: "This account no longer exists." });
    return;
  }

  req.user = payload;
  next();
};

export const isRestaurant = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ message: "Authentication required." });
    return;
  }
  if (req.user.memberType !== MemberType.RESTAURANT) {
    res.status(403).json({ message: "Access denied. Restaurant accounts only." });
    return;
  }
  next();
};

export const isUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ message: "Authentication required." });
    return;
  }
  if (req.user.memberType !== MemberType.USER) {
    res.status(403).json({ message: "Access denied. User accounts only." });
    return;
  }
  next();
};

export const isOwner = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ message: "Authentication required." });
    return;
  }
  const targetId = req.params.memberId;
  if (!targetId) {
    res.status(400).json({ message: "Member ID is required in route params." });
    return;
  }
  if (req.user._id !== targetId) {
    res.status(403).json({ message: "Access denied. You can only modify your own data." });
    return;
  }
  next();
};