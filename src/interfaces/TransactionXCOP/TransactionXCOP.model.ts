import type { BaseModel } from "../Base.model";
import type { User } from "../User/User.model";

export declare interface TransactionXCOP extends BaseModel<TransactionXCOPAttributes, TransactionXCOPRelationships> { }

export declare interface TransactionXCOPAttributes {
    user_receipt_id: number | ''
    user_send_id: number | ''
    quantity: number
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export declare interface TransactionXCOPRelationships {
    userSend: User
    userReceipt: User
}

export declare interface WithdrawalXCOP extends BaseModel<WithdrawalXCOPAttributes,WithdrawalXCOPRelationships>{}

export declare interface WithdrawalXCOPRelationships {
    user: User;
    wallet?: any;
    account?: any;
}

export declare interface WithdrawalXCOPAttributes {
    user_id: number;
    wallet_id?: any;
    account_id?: any;
    type: string;
    amount: number;
    processed_by?: any;
    status: string;
    fee: number;
    created_at: string;
    updated_at: string;
}