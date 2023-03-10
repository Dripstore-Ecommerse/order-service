import { Document, Model, Schema } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  orderDate: Date;
  totalAmount: number;
  status: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface OrderModel extends Model<IOrder> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateOrderBody = Partial<IOrder>;

// export type NewRegisteredOrder = Omit<IOrder, "updatedAt" | "slug">;
export type NewRegisteredOrder = IOrder;

// export type NewCreatedOrder = Omit<IOrder, "updatedAt">;
export type NewCreatedOrder = IOrder;
