import type { BaseModel } from "@/interfaces/Base.model";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import type { PaymentMethod } from "@/interfaces/PaymentMethod/PaymentMethod.model";

export declare interface EfectyAccount extends BaseModel<EfectyAccountAttributes,EfectyAccountRelationships>{}

export declare interface EfectyAccountAttributes {
    currency_id: number
    type_company_account_id: number
    account_number:string
    identification_document:string
    beneficiary:string
    description:string
    location:string
    link:string
    recommendation:string
    coordinate:string
}

export declare interface EfectyAccountRelationships {
    currency: Currency
    typeAccount: PaymentMethod
}