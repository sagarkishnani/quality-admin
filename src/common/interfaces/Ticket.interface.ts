export interface GetTicketsResponse {
    IdTicket: string;
    IdTicketStatus: string;
    IdTicketCompany: string;
    IdTicketType: string | null;
    IdTechnician: string | null;
    RecordCreationDate: Date;
    AppointmentDate: Date | null;
    TicketStatus: GetTicketsTicketStatusResponse;
    TicketType: GetTicketsTicketTypeResponse | null;
}

export interface GetTicketsTicketStatusResponse {
    Name: string;
}

export interface GetTicketsTicketTypeResponse {
    Name: string;
}