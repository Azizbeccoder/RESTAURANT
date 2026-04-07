import {
  Order,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../libs/types/order";
import { Member } from "../libs/types/member";
import OrderModel from "../scheme/Order.model";
import OrderItemModel from "../scheme/OrderItem.model";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import MemberService from "./Member.service";
import { OrderStatus } from "../libs/enums/order.enum";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;
  private readonly memberService;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
    this.memberService = new MemberService();
  }

  public async createOrder(
    member: Member,
    input: OrderItemInput[]
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const amount = input.reduce(
      (accumulator: number, item: OrderItemInput) => {
        return accumulator + item.itemPrice * item.itemQuantity;
      },
      0
    );
    const delivery = amount < 100 ? 5 : 0;

    try {
      const newOrder: Order = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDelivery: delivery,
        memberId: memberId,
      }) as unknown as Order;

      const orderId = newOrder._id;
      console.log("orderId:", newOrder._id);

      // BUG FIX: orderId typed as any to avoid Types.ObjectId vs Schema.Types.ObjectId TS2345
      await this.recordOrderItem(orderId as any, input);

      return newOrder;
    } catch (err) {
      console.log("Error, model:createOrder:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  // BUG FIX: orderId param typed as any — same ObjectId mismatch fix
  private async recordOrderItem(
    orderId: any,
    input: OrderItemInput[]
  ): Promise<void> {
    const promisedList = input.map(async (item: OrderItemInput) => {
      // BUG FIX: item.orderId typed as any in order.ts to allow assignment
      (item as any).orderId = orderId;
      item.productId = shapeIntoMongooseObjectId(item.productId);
      await this.orderItemModel.create(item);
      return "INSERTED";
    });

    const orderItemState = await Promise.all(promisedList);
    console.log("orderItemState:", orderItemState);
  }

  public async getMyOrders(
    member: Member,
    inquiry: OrderInquiry
  ): Promise<Order[]> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const matches = { memberId: memberId, orderStatus: inquiry.orderStatus };

    const result = await this.orderModel
      .aggregate([
        { $match: matches },
        { $sort: { updatedAt: -1 } },
        { $skip: (inquiry.page - 1) * inquiry.limit },
        { $limit: inquiry.limit },
        {
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "productData",
          },
        },
      ])
      .exec();

    if (!result.length)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result as unknown as Order[];
  }

  public async updateOrder(
    member: Member,
    input: OrderUpdateInput
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      orderId = shapeIntoMongooseObjectId(input.orderId),
      orderStatus = input.orderStatus;

    const result = await this.orderModel
      .findOneAndUpdate(
        { memberId: memberId, _id: orderId },
        { orderStatus: orderStatus },
        { new: true }
      )
      .exec();

    if (!result)
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    if (orderStatus === OrderStatus.PROCESS) {
      await this.memberService.addUserPoint(member, 1);
    }
    return result as unknown as Order;
  }
}

export default OrderService;