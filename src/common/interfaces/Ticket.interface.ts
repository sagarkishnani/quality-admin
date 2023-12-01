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

export interface TicketRegisterStepThreeRequestFormThree {
    BandejaUno: string | null;
    BisagraEscaner: string | null;
    BandejaDos: string | null;
    BandejaADF: string | null;
    BandejaSalida: string | null;
    CristalCamaPlana: string | null;
    ConectorUSB: string | null;
    Engranaje: string | null;
    ConectorRJ: string | null;
    LaminaTeplon: string | null;
    PanelControl: string | null;
    RodilloPresion: string | null;
}

export interface TicketRegisterStepThreeRequestFormFour {
    Instalacion: boolean | null;
    Retiro: boolean | null;
    Reparacion: boolean | null;
    ActualFirmware: boolean | null;
    EtiquetaFusor: boolean | null;
    EtiquetaFusorTeflon: boolean | null;
    CambioCartucho: boolean | null;
    CambioFusor: boolean | null;
    CambioImagen: boolean | null;
    CambioRodillo: boolean | null;
    CambioTeflon: boolean | null;
    CambioRodilloBUno: boolean | null;
    CambioRodilloBDos: boolean | null;
    CambioSeparador: boolean | null;
    CambioDrive: boolean | null;
    CambioSwing: boolean | null;
    CambioAOF: boolean | null;
    CambioDC: boolean | null;
    MantImpresora: boolean | null;
    MantOptico: boolean | null;
    MantOpticoEscaner: boolean | null;
    MantSistema: boolean | null;
    RevCartucho: boolean | null;
    RevFusor: boolean | null;
    RevImagen: boolean | null;
    RevADF: boolean | null;
    RevRodilloBUno: boolean | null;
    RevRodilloBDos: boolean | null;
    RevSeparador: boolean | null;
    RevDuplex: boolean | null;
}

export interface TicketRegisterStepThreeRequest {
    FoundFailure: string;
    Comment: string;
    Recommendation: string;
    AppointmentDate: Date;
}