import type { BaseModel } from "../Base.model";
import type { Permission } from "../Permission/Permission.model";

export declare interface Role extends BaseModel {
    name: string;
    guard_name: string;
    pivot: Pivot;
    permissions: Permission[];
}
export declare interface Pivot {
    model_id: number;
    role_id: number;
    model_type: string;
}