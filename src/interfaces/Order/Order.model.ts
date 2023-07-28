import type { BaseModel, BaseModelSoftDelete } from "../Base.model";
import type { BankAccount } from "../CompanyAccount/BankAccount/BankAccount.model";
import type { EfectyAccount } from "../CompanyAccount/EfectyAccount/EfectyAccount.model";
import type { OtherAccount } from "../CompanyAccount/OtherAccount/OtherAccount.model";
import type { Currency } from "../Currency/Currency.model";
import type { PaymentMethod } from "../PaymentMethod/PaymentMethod.model";
import type { ShippingType } from "../ShippingType/ShippingType.model";
import type { User } from "../User/User.model";

export declare interface Order extends BaseModelSoftDelete<OrderAttributes, OrderRelationships> { }

export declare interface OrderAttributes {
        wallet_id?: number | ''
        currency_id: number | ''
        payment_type_id: number | ''
        shipping_type_id: number | ''
        account_delivery_id: number | ''
        type: 'Compra' | 'Venta'
        red_id: number | ''
        amount_currency: string
        received_amount: string
        fee: string
        currency_price: string
        exchange_reference: string
        total_exchange_reference: string
        exchange_local: string
        total_exchange_local: string
        grades?: string
        address_send?: string

        user_id: number;
        tranx_no: string;
        status_id: number;
        processed_by?: any;
        account_delivery_type: string;
        
}

export declare interface OrderRelationships {
        account_delivery: BankAccount | EfectyAccount | OtherAccount
        adminProcess?: null
        currency: Currency
        currencyExchangeOrder: CurrencyExchangeOrder
        payment: PaymentMethod
        shipping: ShippingType
        status: OrderStatus
        user: User
}

// ----------------------------------------------------------------
export declare interface OrderStatus extends BaseModel<OrderStatusAttributes,null>{}
interface OrderStatusAttributes {
        name: string;
        description: string;
}

export declare interface CurrencyExchangeOrder extends BaseModel<CurrencyExchangeOrderAttributes,CurrencyExchangeOrderRelationships>{}

interface CurrencyExchangeOrderAttributes {
        order_id:3
        local_currency_id:number
        reference_currency_id:number
        exchange_local: string
        exchange_reference: string
        total_exchange_local: string
        total_exchange_reference: string
       
}

interface CurrencyExchangeOrderRelationships {
        localCurrency: Currency
        referenceCurrency: Currency
}
