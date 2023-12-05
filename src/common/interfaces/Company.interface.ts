export interface CompanyRegisterRequest {
    Name: string;
    Ruc: string;
    Ubigeo: number;
    Address: string;
    ImgUrl: string;
    Local: string;
    MainContactName: string;
    MainContactPosition: string;
    MainContactEmail: string;
    MainContactPhone: string;
    MainContactPayment: string;
    MainContactCE: string;
    MainContactCurrency: string;
    MainContactAlias: string;
    MainContactBanks: string;
    MainContactEmailInvoice?: string | null;
    MainContactEmailInvoice2?: string | null;
    BillingContactName?: string | null;
    BillingContactPosition?: string | null;
    BillingContactEmail?: string | null;
    BillingContactPhone?: string | null;
    BillingContactCellphone?: string | null;
    ReportContactName?: string | null;
    ReportContactPosition?: string | null;
    ReportContactEmail?: string | null;
    ReportContactPhone?: string | null;
    ReportContactCellphone?: string | null;
    PurchaseContactName?: string | null;
    PurchaseContactPosition?: string | null;
    PurchaseContactEmail?: string | null;
    PurchaseContactPhone?: string | null;
    PurchaseContactCellphone?: string | null;
    WarehouseContactName?: string | null;
    WarehouseContactPosition?: string | null;
    WarehouseContactEmail?: string | null;
    WarehouseContactPhone?: string | null;
    WarehouseContactCellphone?: string | null;
    AfterSalesContactName?: string | null;
    AfterSalesContactPosition?: string | null;
    AfterSalesContactEmail?: string | null;
    AfterSalesContactPhone?: string | null;
    AfterSalesContactCellphone?: string | null;
}

export interface GetCompaniesResponse {
    IdCompany: string;
    Name: string;
    ImgUrl: string;
    Ruc: string;
    Address: string;
    MainContactName: string;
    MainContactEmail: string;
}