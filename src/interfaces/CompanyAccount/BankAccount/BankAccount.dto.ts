import type {  BaseUpdate } from "@/interfaces/Base.model";
import type { BankAccountAttributes } from "./BankAccount.model";

export declare interface BankAccountCreate extends BankAccountAttributes{}
export declare interface BankAccountUpdate extends BankAccountAttributes, BaseUpdate{}