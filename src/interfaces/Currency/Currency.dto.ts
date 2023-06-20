import type { BaseUpdate } from "../Base.model";
import type { CurrencyAttributes } from "./Currency.model";

export declare interface CurrencyCreate extends CurrencyAttributes{}

export declare interface CurrencyUpdate extends CurrencyAttributes, BaseUpdate{}