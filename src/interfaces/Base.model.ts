export declare interface BaseModel {
    id:number
    created_at: Date
    updated_at: Date
}

export declare interface BaseModelSoftDelete extends BaseModel {
    deleted_at?: Date
}