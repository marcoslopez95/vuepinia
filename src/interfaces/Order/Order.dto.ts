import type { OrderAttributes } from "./Order.model";

export declare interface OrderCreate extends OmitField { }

type OmitField = Omit<OrderAttributes,
    | 'user_id'
    | 'tranx_no'
    | 'status_id'
    | 'processed_by'
    | 'account_delivery_type'
>