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

export interface User {
    Dni: number;
    Name: string;
    PhoneNumber: number;
    IdRole: string;
    IdCompany: string;
    ImageUrl: string;
    email: string;
    password: string;
}