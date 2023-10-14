export interface MasterTableRegisterRequest {
    IdMasterTable: string;
    IdMasterTableParent?: string | null;
    Name: string;
    Value?: string | null;
    Order: number;
}

export interface MasterTableEditRequest {
    IdMasterTableParent?: string | null;
    Name: string;
    Value?: string | null;
    Order: number;
}

export interface MasterTable {
    IdMasterTable: string;
    IdMasterTableParent?: string | null;
    Name: string;
    Value?: string | null;
    Order: number;
}
