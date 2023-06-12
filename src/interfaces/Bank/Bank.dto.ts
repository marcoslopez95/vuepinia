import type { BaseUpdate } from "../Base.model";
import type { BankAttributes } from "./Bank.model";

export declare interface BankCreate extends BankAttributes{}
export declare interface BankUpdate extends BankAttributes,BaseUpdate{}