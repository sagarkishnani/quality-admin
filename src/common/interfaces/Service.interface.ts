export interface RegisterServiceInterface {
    Name: string;
    Cost: number;
}

export interface ServiceInterface {
    IdService: string;
    Name: string;
    Cost: number;
    RecordCreationDate: Date;
}

export interface ServiceEditInterface {
    Name: string;
    Cost: number;
}