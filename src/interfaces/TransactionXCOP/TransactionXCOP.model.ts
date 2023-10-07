import type { BaseModel } from "../Base.model";
import type { User } from "../User/User.model";

export declare interface TransactionXCOP extends BaseModel<TransactionXCOPAttributes,TransactionXCOPRelationships>{}

export declare interface TransactionXCOPAttributes {
    user_receipt_id: number | ''
    user_send_id: number | ''
    quantity: number
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export declare interface TransactionXCOPRelationships{
    userSend: User
    userReceipt: User
}