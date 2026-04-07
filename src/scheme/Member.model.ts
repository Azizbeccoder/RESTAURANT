import mongoose, { Schema } from "mongoose";
import { MemberType, MemberStatus } from "../libs/enums/member.enum";

const memberSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },

    memberStatus: {
      type: String,
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberPassword: {
      type: String,
      // BUG FIX: "select: false" must be a top-level field option, not nested
      // inside a sub-object. The original had it nested under "type/select" which
      // is incorrect schema syntax. Corrected to proper Mongoose field definition.
      select: false,
      required: true,
    },

    memberAddress: {
      type: String,
    },

    memberDesk: {
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
  { timestamps: true } // updatedAt, createdAt
);

export default mongoose.model("Member", memberSchema);
