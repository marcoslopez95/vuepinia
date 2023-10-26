import type { BaseModel, BaseUpdate } from "../Base.model";
import type { Currency } from "../Currency/Currency.model";
import type { ExternalDepositAttributes } from "./ExternalDeposit.model";

export declare interface ExternalDepositUpdate extends ExternalDepositAttributes,BaseUpdate{}
export declare interface ExternalDepositCreate extends ExternalDepositAttributes{}
