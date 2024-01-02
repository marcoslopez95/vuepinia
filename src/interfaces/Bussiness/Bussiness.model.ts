import type { BaseModel } from "../Base.model";
import type { Country } from "../Country/Country.model";
import type { Departament } from "../Departament/Departament.model";
import type { Municipality } from "../Municipality/Municipality.model";
import type { User } from "../User/User.model";

export declare interface Bussiness extends BaseModel<BussinessAttributes, BussinessRelationships> { }

interface BussinessRelationships {
    country: Country;
    user: User;
    municipalitie?: Municipality;
    department?: Departament;
    kyc?: any;
}

export declare interface BussinessAttributes {
    user_id: number;
    country_id: number;
    name: string;
    department_id?: number;
    municipalitie_id?: number;
    nic: string;
    code_phone?: number;
    phone: number;
    address?: string;
    verified: number;
}