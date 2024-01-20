export interface Notification {
    IdNotification: number;
    IdTicket: string;
    IdTicketStatus: string;
    CodeTicket: number;
    RecordCreationDate: Date;
    IdCompany: string;
    IdUser: string;
    IdTechnician: string | null;
    RecordEditDate: Date | null;
    TicketStatus: any;
}

export interface RegisterNotificationRequest {
    IdTicket: string;
    IdTicketStatus: string;
    CodeTicket: number;
    IdCompany: string;
    IdUser: string;
    IdTechnician: string | null;
}