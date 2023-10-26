import type { TransactionXCOPAttributes } from "./TransactionXCOP.model"

export declare interface TransactionXCOPCreate  {
    xcop_send: number | string
    user_receipt_id: number | string
}

// type pickCreate = 'user_receipt_id'
// type create = Pick<TransactionXCOPAttributes,pickCreate>