export declare interface BaseModel<Attributes,Relationships> {
    id:number
    attributes: Attributes,
    relationships?: Relationships[]
    created_at: Date
    updated_at: Date
}

export declare interface BaseModelSoftDelete<Attributes,Relationships> extends BaseModel<Attributes,Relationships> {
    deleted_at?: Date
}

export declare interface BaseUpdate{
    id:number
}