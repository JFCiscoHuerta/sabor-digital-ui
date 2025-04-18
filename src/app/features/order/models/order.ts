import { OrderDto } from "./orderDto";

export interface Order {
    id: number;
    itemsId?: Array<number>;
    restaurantId: number;
    waiterId: number;
    price: number;
    tableId?: number;
    orderType: OrderDto.OrderTypeEnum;
    paymentType: OrderDto.PaymentTypeEnum;
    orderStatus?: OrderDto.OrderStatusEnum;
    createdAt: Date;
}
