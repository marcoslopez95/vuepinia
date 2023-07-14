import type { BaseModelSoftDelete } from "../Base.model";
import type { Currency } from "../Currency/Currency.model";

export declare interface Order extends BaseModelSoftDelete<OrderAttributes, OrderRelationships> { }

export declare interface OrderAttributes {
        wallet_id?: number | ''
        currency_id: number | ''
        payment_type_id: number | ''
        shipping_type_id: number | ''
        account_delivery_id: number | ''
        type: 'Compra' | 'Venta'
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
        address_send: string;
        
        grades?: any;
}

export declare interface OrderRelationships {
}