export interface CompanyLocalRegisterRequest {
    IdCompany: string;
    Name: string;
    Ubigeo: number;
    Address: string;
    Mails: string;
}

export interface CompanyLocal {
    IdCompanyLocal: string;
    IdCompany: string;
    Name: string;
    Ubigeo: number;
    Address: string;
    Mails: string;
    RecordCreationDate: Date;
    RecordStatus: boolean;
}