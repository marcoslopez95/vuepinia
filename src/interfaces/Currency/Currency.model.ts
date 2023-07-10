import type { BaseModelSoftDelete } from "../Base.model";
import type { CurrencyType } from "../CurrencyType/CurrencyType.model";
import type { Image } from "../Image.model";

export declare interface Currency extends BaseModelSoftDelete<CurrencyAttributes,CurrencyRelationships>{}

export declare interface CurrencyAttributes {
    name:string
    abbreviation:string
    symbol:string
    reference_system_currency: boolean
    wallet_default: boolean
    sale: boolean
    buy: boolean
    icon: '' | string
}

export declare interface CurrencyRelationships {
    typeCurrency?: CurrencyType
    images: Image[]
}