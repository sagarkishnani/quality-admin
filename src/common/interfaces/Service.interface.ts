export interface RegisterServiceInterface {
    Code: string;
    Name: string;
    Cost: number;
}

export interface ServiceInterface {
    Code: string;
    IdService: string;
    Name: string;
    Cost: number;
    RecordCreationDate: Date;
}

export interface ServiceEditInterface {
    Code: string;
    Name: string;
    Cost: number;
}