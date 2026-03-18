import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";

const memberSchema = new Schema(
  {
    // BUG FIX 1: Was "memberType" (capital T) — must match MemberInput interface: "membertype" (lowercase t)
    membertype: {
      type: String,
      enum: Object.values(MemberType), // BUG FIX 2: Was enum: MemberType.USER (only one value) — must use all enum values
      default: MemberType.USER,
    },

    // BUG FIX 3: Was "MemberStatus" (capital M) — field names must be camelCase: "memberStatus"
    memberStatus: {
      type: String,
      enum: Object.values(MemberStatus), // BUG FIX 4: enum needs Object.values() to pass array of values
      default: MemberStatus.ACTIVE,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true }, // BUG FIX 5: memberNick should also be unique (duplicate nick check in service)
      required: true,
    },

    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberPassword: {
      type: String,
      select: false,
      required: true,
    },

    memberAddress: {
      type: String,
    },

    memberDesc: {
      type: String,
    },

    memberImage: {
      type: String,
    },

    memberPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
