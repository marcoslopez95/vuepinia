import type { Bank } from "@/interfaces/Bank/Bank.model";
import type { BaseModel } from "@/interfaces/Base.model";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import type { PaymentMethod } from "@/interfaces/PaymentMethod/PaymentMethod.model";
import type { TypeBankAccount } from "@/interfaces/TypeBankAccount/TypeBankAccount.model";

export declare interface BankAccount extends BaseModel<BankAccountAttributes,BankAccountRelationships>{}

export declare interface BankAccountAttributes {
    bank_id: number
    currency_id: number
    type_company_bank_account_id: number
    payment_type_id: number
    account_number:string
    identification_document:string
    beneficiary:string
    description:string
    recommendation:string
    limit: number
}

export declare interface BankAccountRelationships{
    currency: Currency
    paymentType: PaymentMethod
    bank: Bank
    typeAccountBank: TypeBankAccount
}