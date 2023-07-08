import type { BaseUpdate } from "../Base.model";
import type { CurrencyAttributes } from "./Currency.model";

export declare interface CurrencyCreate extends CurrencyAttributes{
    type_currency_id: '' | number
}

export declare interface CurrencyUpdate extends CurrencyAttributes, BaseUpdate{
    type_currency_id: '' | number
}
