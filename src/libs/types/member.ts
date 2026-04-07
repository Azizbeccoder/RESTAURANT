// BUG FIX: "import { ObjectId } from 'mongoose'" imports the ObjectId *class* which
// has many internal static methods. Mongoose document results return Types.ObjectId
// which is structurally different, causing TS2322 errors throughout Member.service.ts.
// Fix: use "Types" from mongoose and reference Types.ObjectId for all _id fields.
import { Types } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Session } from "express-session";
import { Request } from "express";

export interface Member {
  _id: Types.ObjectId;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesk?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesk?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  _id: Types.ObjectId;
  memberStatus?: MemberStatus;
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesk?: string;
  memberImage?: string;
}

export interface ExtendedRequest extends Request {
  member: Member;
  file: Express.Multer.File;
  files: Express.Multer.File[];
}

export interface AdminRequest extends Request {
  member: Member;
  session: Session & { member: Member };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}