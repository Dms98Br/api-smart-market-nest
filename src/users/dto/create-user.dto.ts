export class CreateUserDto {
    name: string;
    last_name: string;
    email: string;
    user_admin: boolean;
    status: boolean;
    password: string;
    token_cinfirmation: string;
    token_recover: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;    
}

