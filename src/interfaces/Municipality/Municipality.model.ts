import type { BaseModel } from "../Base.model";
import type { Departament } from "../Departament/Departament.model";

export declare interface Municipality extends BaseModel<MunicipalityAttributes,MunicipalityRelationships>{}

export declare interface MunicipalityAttributes {
    name:string
}

export declare interface MunicipalityRelationships {
    department: Departament
}