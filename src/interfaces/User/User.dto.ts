import type { UserAttributes } from "./User.model"

export declare interface Profile extends Omit<Required<UserAttributes>,OmitFields>{
    country_id: '' | number
    department_id: '' | number
    municipalitie_id: '' | number
    address: string
    birth: string
    document: string
}

type OmitFields = 'affiliate_id'
| 'referred_by'
| 'phone_verified_at'
| 'confirmation_code_phone'
| 'confirmation_code_email'
| 'email_verified_at'
| 'second_password'