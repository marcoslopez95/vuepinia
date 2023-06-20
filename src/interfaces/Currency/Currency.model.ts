import type { BaseModelSoftDelete } from "../Base.model";

export declare interface Currency extends BaseModelSoftDelete<CurrencyAttributes,null>{}

export declare interface CurrencyAttributes {
    name:string
    abbreviation:string
    symbol:string
}