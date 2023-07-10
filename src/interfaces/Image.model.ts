import type { BaseModelSoftDelete } from "./Base.model";

export declare interface Image extends BaseModelSoftDelete<ImageAttributes,null>{}

export declare interface ImageAttributes {
    filename: string;
    url?: any;
    imageable_type: string;
    imageable_id: number;
    tag?: any;
    name: string;
    description?: any;
    category?: any;
    created_at: string;
    updated_at: string;
    aws_url: string;
}
