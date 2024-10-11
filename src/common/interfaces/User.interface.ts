

export interface UserRegisterRequest {
    Dni: number;
    Name: string;
    PhoneNumber: number;
    IdRole: string;
    IdCompany: string;
    ImageUrl?: string;
    Companies: string[];
    Position: string;
    email: string;
    password: string;
}

export interface UserEditRequest {
    IdUser: string;
    Dni: number;
    Name: string;
    PhoneNumber: number;
    IdRole: string;
    IdCompany: string;
    Companies: string[];
    ImageUrl?: string;
    Position: string;
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
    IdLocal: UserLocal
}

export interface UserRole {
    Name: string;
}

export interface UserCompany {
    IdCompany: string;
    Name: string;
    Address: string;
    Ruc: string;
    Local: string;
    Mails: string;
    RequiresOrder: boolean;
}

export interface UserLocal {
    IdCompanyLocal: string;
    IdCompany: string;
    Name: string;
    Address: string;
    Mails: string;
}

export interface UserCompanyRegister {
    IdUser: string;
    IdCompany: string;
}

export interface UserLocalRegister {
    IdUser: string;
    IdLocal: string;
}

export interface GetUserCompany {
    IdCompany: string;
    Name: string;
}

export interface GetUserLocal {
    IdLocal: string;
    IdCompany: string;
    Name: string;
}