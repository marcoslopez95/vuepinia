import type { BaseModel } from "@/interfaces/Base.model";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import type { PaymentMethod } from "@/interfaces/PaymentMethod/PaymentMethod.model";

export declare interface OtherAccount extends BaseModel<OtherAccountAttributes,OtherAccountRelationships>{}

export declare interface OtherAccountAttributes {
    currency_id:number
    payment_type_id:number
    limit:number
    account_number:string
    identification_document:string
    beneficiary:string
    description:string
    phone:string
    code_phone:string
    recommendation:string
}

export declare interface OtherAccountRelationships{
    currency: Currency
    paymentType: PaymentMethod
}

// ----------------------------
export declare interface OtherAccountClient extends BaseModel<OtherAccountClientAttributes,OtherAccountClientRelationships>{}

export declare interface OtherAccountClientAttributes {
    currency_id:number
    payment_type_id:number
    account_number:string
    identification_document:string
    beneficiary:string
    phone:string
    code_phone:string
}

export declare interface OtherAccountClientRelationships{
    currency: Currency
    paymentType: PaymentMethod
    typePayment: PaymentMethod
}