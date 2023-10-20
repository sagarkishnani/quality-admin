import { Moment } from "moment";

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

export interface TicketRegisterStepOneRequest {
    IdTicketStatus: string;
    IdTicketCompany: string;
    IdTicketType: string;
    IdUser: string;
    ReportedFailure: string;
    CompanyFloor: string;
    CompanyArea: string;
}

export interface TicketRegisterAndUploadImage {
    imgName: string;
    file: File;
    IdTicket: string;
    FileUrl: string;
}

// export interface TicketFile {
//     IdTicket: string;
//     FileUrl: string;
// }

export interface UserTicketResponse {
    IdUser: string;
    Name: string;
    email: string;
    PhoneNumber: number;
    IdRole: string;
    RecordCreationDate: string;
    RecordEditDate: string;
    RecordStatus: boolean;
    IdCompany: string;
    Dni: number;
    ImageUrl: string;
    Position: string;
    Company: UserCompany;
    Role: UserRole;
}

export interface UserCompany {
    IdCompany: string;
    Name: string;
    Address: string;
    Local: string;
}

export interface UserRole {
    IdRole: string;
    Name: string;
}

export interface FilteredTicketsRequest {
    IdTechnician: string | null;
    IdCompany: string | null;
    Pending: string | null;
    InProgress: string | null;
    Attended: string | null;
    Finished: string | null;
    Cancelled: string | null;
    Facturable: string | null;
    NotFacturable: string | null;
    RecordCreationDate: any | null;
}

export interface GetTicketById {
    IdTicket: string;
    CodeTicket: number;
    IdTicketStatus: string;
    IdTicketCompany: string;
    IdTicketType: string;
    IdTechnician: string | null;
    RecordCreationDate: Date;
    AppointmentDate: Date | null;
    Company: GetTicketByIdCompany;
    CompanyFloor: string;
    CompanyArea: string;
    ReportedFailure: string;
    TicketStatus: GetTicketByIdAdditional;
    TicketType: GetTicketByIdAdditional;
}

export interface GetTicketByIdCompany {
    Name: string;
    ImgUrl: string;
    Address: string;
}

export interface GetTicketByIdAdditional {
    Name: string;
}

export interface TicketRegisterStepTwoRequest {
    IdTechnician: string;
    ScheduledAppointmentTime: Date;
    ScheduledAppointmentDate: Date;
}

export interface TicketRegisterStepThreeRequestFormOne {
    ScheduledAppointmentInitTime: Moment;
    ScheduledAppointmentEndTime: Moment;
}

export interface TicketRegisterStepThreeRequestFormTwo {
    DeviceOne: string;
    CounterOne: string;
    GuideOne: string;
    DeviceTwo: string;
    CounterTwo: string;
    GuideTwo: string;
    FoundFailure: string;
}
