import type { BaseModel } from "../Base.model";


export declare interface Permission extends BaseModel<PermissionAttributes,null> {}

export declare interface PermissionAttributes {
    name: string;
    guard_name: string;
}
export declare interface Pivot {
    role_id: number;
    permission_id: number;
}
