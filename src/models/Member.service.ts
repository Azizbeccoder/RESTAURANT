import MemberModel from "../Schema/member.model";
import { Member, MemberInput } from "../libs/types/member";
import Errors, { Httpcode, Message } from "../libs/types/errors";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
    private readonly memberModel;
    constructor() {
        this.memberModel = MemberModel;
    }

    public async processSignup(input: MemberInput): Promise<string> {
    const exist = await this.memberModel.findOne({ memberNick: input.memberNick }).exec();
    if (exist) throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED);

    try {
        await this.memberModel.create(input);
        return "done" // ✅ now matches return type
    } catch (err) {
        throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED);
    }
}

}

export default MemberService; 