import { Moment } from "moment";
import { RegisterTicketAnswerRequest } from "./TicketAnswer.interface";
import { CompanyLocal } from "./CompanyLocal.interface";

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
    Local: string;
    IdUser: string;
    ReportedFailure: string;
    CompanyFloor: string;
    CompanyArea: string;
}

export interface TicketRegisterAndUploadImage {
    imgName: string;
    file: File;
    IdTicket: string;
    FilePurpose: string;
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
    Waiting: string | null;
    Open: string | null;
    Finished: string | null;
    Cancelled: string | null;
    Facturable: string | null;
    NotFacturable: string | null;
    RecordCreationDate: any | null;
}

export interface FilteredTicketsByExcelRequest {
    IdCompany: string[];
    Pending: string | null;
    InProgress: string | null;
    Attended: string | null;
    Waiting: string | null;
    Open: string | null;
    Finished: string | null;
    Cancelled: string | null;
    InitDate: any | null;
    EndDate: any | null;
}

export interface GetTicketById {
    IdTicket: string;
    CodeTicket: number;
    IdTicketStatus: string;
    IdTicketCompany: string;
    IdTicketType: string;
    IdTechnician: string | null;
    IdUser: string;
    User: GetTicketByIdUser;
    RecordCreationDate: Date;
    AppointmentDate: Date | null;
    AppointmentInitTime: Date | null;
    AppointmentEndTime: Date | null;
    DeviceOne: string | null;
    DeviceOneValue: string | null;
    SeriesNumberOne: string | null;
    CounterOne: number | null;
    GuideOne: string | null;
    DeviceTwo: string | null;
    DeviceTwoValue: string | null;
    SeriesNumberTwo: string | null;
    CounterTwo: number | null;
    GuideTwo: string | null;
    FoundFailure: string | null;
    Company: GetTicketByIdCompany;
    Local: CompanyLocal;
    CompanyFloor: string;
    CompanyArea: string;
    ReportedFailure: string;
    Comment: string | null;
    Recommendation: string | null;
    ResponsibleName: string | null;
    ResponsibleDni: string | null;
    TechnicianName: string | null;
    TechnicianDni: string | null;
    TicketAnswer: RegisterTicketAnswerRequest;
    TicketStatus: GetTicketByIdAdditional;
    TicketType: GetTicketByIdAdditional;
    TicketFile: TicketFile[];
}

export interface TicketFile {
    FileUrl: string;
    FilePurpose: string;
}

export interface GetTicketByIdCompany {
    Name: string;
    ImgUrl: string;
    Address: string;
    FacturableMails: string;
    Local: string;
    RequiresOrder: boolean;
    Mails: string;
}

export interface GetTicketByIdAdditional {
    Name: string;
}

export interface GetTicketByIdUser {
    Name: string;
    email: string;
}

export interface TicketRegisterStepTwoRequest {
    IdTechnician: string | null;
    IsGuaranteeTechnician: boolean;
    ScheduledAppointmentTime: Date;
    ScheduledAppointmentDate: Date;
}

export interface TicketRegisterStepThreeRequestFormOne {
    AppointmentInitTime: Moment;
    AppointmentEndTime: Moment;
}

export interface TicketRegisterStepThreeRequestFormTwo {
    DeviceOne: string;
    DeviceOneValue: string;
    SeriesNumberOne: string;
    CounterOne: string;
    GuideOne: string;
    SeriesNumberTwo: string;
    DeviceTwo: string;
    DeviceTwoValue: string;
    CounterTwo: string;
    GuideTwo: string;
    FoundFailure: string;
    Pictures: TicketRegisterStepThreePicture[];
    PartOne?: string;
    ProcedureOne?: string;
    PartOneLabel?: string;
    ProcedureOneLabel?: string;
    PartTwo?: string;
    ProcedureTwo?: string;
    PartTwoLabel?: string;
    ProcedureTwoLabel?: string;
    PartThree?: string;
    ProcedureThree?: string;
    PartThreeLabel?: string;
    ProcedureThreeLabel?: string;
}

export interface TicketRegisterStepThreePicture {
    Content: string;
    FilePurpose: string;
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
    Cambio: boolean | null;
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
    Mantenimiento: boolean | null;
    MantImpresora: boolean | null;
    MantOptico: boolean | null;
    MantOpticoEscaner: boolean | null;
    MantSistema: boolean | null;
    Revision: boolean | null;
    RevCartucho: boolean | null;
    RevFusor: boolean | null;
    RevImagen: boolean | null;
    RevADF: boolean | null;
    RevRodilloBUno: boolean | null;
    RevRodilloBDos: boolean | null;
    RevSeparador: boolean | null;
    RevDuplex: boolean | null;
}

export interface TicketRegisterStepThreeRequestFormFive {
    UsoPapelHumedo: boolean | null;
    UsoPapelReciclado: boolean | null;
    UsoPapelGrapas: boolean | null;
    UsoEtiquetas: boolean | null;
    ConectadoPared: boolean | null;
    ConectadoSupresor: boolean | null;
    ConectadoEstabilizador: boolean | null;
    ConectadoUPS: boolean | null;
    Operativo: boolean | null;
    PegadoEtiquetaGarantia: boolean | null;
    EnObservacion: boolean | null;
    EquipoRequiereCambio: boolean | null;
    EquipoRequiereMantenimiento: boolean | null;
    CartuchoOtroProveedor: boolean | null;
    CartuchoDanado: boolean | null;
    Instalacion: boolean | null;
    ServicioGarantia: boolean | null;
    Negligencia: boolean | null;
    Mantenimiento: boolean | null;
    Retiro: boolean | null;
    Reparacion: boolean | null;
}

export interface TicketRegisterStepThreeRequestFormSix {
    Comment: string;
    Recommendation: string;
    ResponsibleSignature: TicketRegisterStepThreePicture;
    ResponsibleName: string;
    ResponsibleDni: string;
    TechnicianSignature: TicketRegisterStepThreePicture;
    TechnicianName: string;
    TechnicianDni: string;
}

export interface TicketRegisterStepThreeRequest {
    StepOne: TicketRegisterStepThreeRequestFormOne;
    StepTwo: TicketRegisterStepThreeRequestFormTwo;
    StepThree: TicketRegisterStepThreeRequestFormThree;
    StepFour: TicketRegisterStepThreeRequestFormFour;
    StepFive: TicketRegisterStepThreeRequestFormFive;
    StepSix: TicketRegisterStepThreeRequestFormSix;
}