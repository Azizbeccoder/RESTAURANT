import MemberModel from "../schema/member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { Httpcode, Message } from "../libs/types/errors";
import bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel: typeof MemberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberNick: input.memberNick })
      .exec();

    if (exist) {
      throw new Errors(Httpcode.BAD_REQUEST, "Username already taken.");
    }

    const salt = await bcrypt.genSalt(10);
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    const result = await this.memberModel.create(input);

    if (!result) {
      throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED);
    }

    const member = result.toObject() as Member;
    delete member.memberPassword;
    return member;
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();

    if (!member) {
      throw new Errors(Httpcode.NOT_FOUND, Message.NO_MEMBER_NICK);
    }

    if (!member.memberPassword) {
      throw new Errors(Httpcode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const isMatch: boolean = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) {
      throw new Errors(Httpcode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id).exec();

    if (!result) {
      throw new Errors(Httpcode.NOT_FOUND, Message.NO_MEMBER_NICK);
    }

    const loginMember = result.toObject() as Member;
    delete loginMember.memberPassword;
    return loginMember;
  }

  public async getMembers(): Promise<Member[]> {
    const results = await this.memberModel
      .find({}, { memberPassword: 0 })
      .sort({ createdAt: -1 })
      .exec();
    return results.map((r) => r.toObject() as Member);
  }
}

export default MemberService;