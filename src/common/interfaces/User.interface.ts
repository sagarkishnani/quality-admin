export interface UserRegisterRequest {
    Dni: number;
    Name: string;
    PhoneNumber: number;
    IdRole: string;
    IdCompany: string;
    ImageUrl?: string;
    email: string;
    password: string;
}

export interface UserEditRequest {
    Dni: number;
    Name: string;
    PhoneNumber: number;
    IdRole: string;
    IdCompany: string;
    ImageUrl?: string;
    email: string;
}

export interface User {
    IdUser: string;
    Dni: number;
    Name: string;
    PhoneNumber: number;
    IdRole: string;
    IdCompany: string;
    ImageUrl: string;
    email: string;
    password: string;
    Position: string;
    Role: UserRole;
    Company: UserCompany;
}

export interface UserRole {
    Name: string;
}

export interface UserCompany {
    Name: string;
}