import type { BaseModel } from "../Base.model";


export declare interface Permission extends BaseModel {
    name: string;
    guard_name: string;
    pivot: Pivot;
}

export declare interface Pivot {
    role_id: number;
    permission_id: number;
}
