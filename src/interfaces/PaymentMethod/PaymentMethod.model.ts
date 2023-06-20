import type { BaseModelSoftDelete } from "../Base.model";

export declare interface PaymentMethod extends BaseModelSoftDelete<PaymentMethodAttributes,null>{}

export declare interface PaymentMethodAttributes{
    name:string
    description?:string
}