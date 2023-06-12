import type { BaseModel, BaseModelSoftDelete } from "../Base.model";
import type { Country } from "../Country/Country.model";

export declare interface Bank extends BaseModelSoftDelete<BankAttributes,BankRelationships> {}

export declare interface BankAttributes {
  name: string;
  country_id: number;
  description: string;
  status: boolean;
}

export declare interface BankRelationships {
    country: Country
}