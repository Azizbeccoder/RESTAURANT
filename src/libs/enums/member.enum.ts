// Enums must be consistent with what's used in member.model.ts, MemberInput, and controllers

export enum MemberType {
  USER = "USER",
  RESTAURANT = "RESTAURANT",
}

export enum MemberStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETE = "DELETE",
}
