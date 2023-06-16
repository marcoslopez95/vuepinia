import type { BaseModelSoftDelete } from "../Base.model";
import type { Role } from "../Role/Role.model";

export declare interface User extends BaseModelSoftDelete<UserAttributes,Relationships> {}
export interface UserAttributes {
  first_name: string;
  second_name?: any;
  last_name?: any;
  second_last_name?: any;
  email: string;
  email_verified_at?: any;
  second_password?: any;
  code_phone?: any;
  phone?: any;
  phone_verified_at?: any;
  confirmation_code_phone?: any;
  confirmation_code_email?: any;
  username: string;
  referred_by?: any;
  affiliate_id?: any;
}

interface Relationships {
  roles: Role[];
}