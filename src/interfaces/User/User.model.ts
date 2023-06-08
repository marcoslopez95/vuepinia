export declare interface User {
    id: number;
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
    deleted_at?: any;
    created_at: string;
    updated_at: string;
    roles: Role[];
  }
  
export declare interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
    permissions: Permission[];
  }
  
export declare interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: Pivot2;
  }
  
export declare interface Pivot2 {
    role_id: number;
    permission_id: number;
  }
  
export declare interface Pivot {
    model_id: number;
    role_id: number;
    model_type: string;
  }