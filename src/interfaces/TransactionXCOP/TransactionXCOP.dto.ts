import type { TransactionXCOPAttributes } from "./TransactionXCOP.model"

export declare interface TransactionXCOPCreate extends create {
    xcop_send: number | string
}

type pickCreate = 'user_receipt_id'
type create = Pick<TransactionXCOPAttributes,pickCreate>