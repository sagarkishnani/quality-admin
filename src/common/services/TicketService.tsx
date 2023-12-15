import { createClient } from "@supabase/supabase-js"
import {
  FilteredTicketsRequest,
  TicketRegisterAndUploadImage,
  TicketRegisterStepOneRequest,
  TicketRegisterStepThreeRequest,
  TicketRegisterStepTwoRequest,
} from "../interfaces/Ticket.interface"
import moment from "moment"
import { ConstantTicketStatus, ConstantTicketTypes } from "../constants"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getTickets() {
  try {
    const { data, error } = await supabase
      .from("Ticket")
      .select(
        "IdTicket, CodeTicket, IdTicketStatus, IdTicketCompany, IdTicketType, IdTechnician, RecordCreationDate, AppointmentDate, Company (Name, ImgUrl), TicketStatus (Name), TicketType (Name)"
      )

    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error fetching tickets:", error)
    return []
  }
}

async function getTicketById(idTicket: string) {
  try {
    const { data, error } = await supabase
      .from("Ticket")
      .select(
        "*, Company (Name, ImgUrl, Address, Local), TicketStatus (Name), TicketType (Name), User (Name, email), TicketAnswer(*), TicketFile (*)"
      )
      .eq("IdTicket", idTicket)

    if (error) {
      console.warn(error)
      return null
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error al traer ticket:", error)
    return null
  }
}

// async function getFilteredTickets(request: FilteredTicketsRequest) {
//   try {
//     let query = supabase
//       .from("Ticket")
//       .select(
//         "IdTicket, CodeTicket, IdTicketStatus, IdTicketCompany, IdTicketType, IdTechnician, RecordCreationDate, AppointmentDate, Company (Name), TicketStatus (Name), TicketType (Name)"
//       )

//     if (checkIfNotNullOrEmpty(request.Pending)) {
//       query = query.eq("IdTicketStatus", request.Pending)
//     }

//     if (checkIfNotNullOrEmpty(request.InProgress)) {
//       query = query.eq("IdTicketStatus", request.InProgress)
//     }

//     if (checkIfNotNullOrEmpty(request.Attended)) {
//       query = query.eq("IdTicketStatus", request.Attended)
//     }

//     if (checkIfNotNullOrEmpty(request.Finished)) {
//       query = query.eq("IdTicketStatus", request.Finished)
//     }

//     if (checkIfNotNullOrEmpty(request.Cancelled)) {
//       query = query.eq("IdTicketStatus", request.Cancelled)
//     }

//     if (checkIfNotNullOrEmpty(request.Facturable)) {
//       query = query.eq("IdTicketStatus", request.Facturable)
//     }

//     if (checkIfNotNullOrEmpty(request.NotFacturable)) {
//       query = query.eq("IdTicketStatus", request.NotFacturable)
//     }

//     const { data, error } = await query
//     if (error) {
//       console.warn(error)
//       return error
//     } else if (data) {
//       return data
//     }
//   } catch (error) {
//     console.error("Error fetching items:", error)
//     return []
//   }
// }

async function getFilteredTickets(request: FilteredTicketsRequest) {
  const idcompany = request.IdCompany
  const idtechnician = request.IdTechnician
  const pending = request.Pending
  const inprogress = request.InProgress
  const attended = request.Attended
  const finished = request.Finished
  const cancelled = request.Cancelled
  const facturable = request.Facturable
  const notfacturable = request.NotFacturable
  const recordcreationdate = request.RecordCreationDate
  try {
    const { data, error } = await supabase.rpc("buscar_tickets", {
      attended,
      cancelled,
      facturable,
      finished,
      idcompany,
      idtechnician,
      inprogress,
      notfacturable,
      pending,
      recordcreationdate,
    })
    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al traer la lista de tickets:", error)
    return []
  }
}

async function getTicketUserById(IdUser: string) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select(
        "*, Company (IdCompany, Name, Address, Local), Role (IdRole, Name)"
      )
      .eq("IdUser", IdUser)

    if (error) {
      console.warn(error)
      return null
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error fetching items:", error)
    return []
  }
}

async function registerTicketStepOne(request: TicketRegisterStepOneRequest) {
  try {
    const { data, error, status } = await supabase
      .from("Ticket")
      .insert([
        {
          IdTicketStatus: request.IdTicketStatus,
          IdTicketCompany: request.IdTicketCompany,
          IdTicketType:
            request.IdTicketType == "" ? null : request.IdTicketType,
          IdUser: request.IdUser,
          ReportedFailure: request.ReportedFailure,
          CompanyFloor: request.CompanyFloor,
          CompanyArea: request.CompanyArea,
          RecordCreationDate: moment().startOf("day").toISOString(),
        },
      ])
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar ticket", error)
    return error
  }
}

async function registerTicketStepTwo(
  request: TicketRegisterStepTwoRequest,
  idTicket: string
) {
  try {
    const { data, error, status } = await supabase
      .from("Ticket")
      .update({
        IdTechnician: request.IdTechnician,
        IsGuaranteeTechnician: request.IsGuaranteeTechnician,
        ScheduledAppointmentTime: request.ScheduledAppointmentTime,
        ScheduledAppointmentDate: request.ScheduledAppointmentDate,
        IdTicketStatus: ConstantTicketStatus.EN_PROGRESO,
      })
      .eq("IdTicket", idTicket)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar ticket", error)
    return error
  }
}

async function registerTicketStepThree(
  request: TicketRegisterStepThreeRequest,
  idTicket: string,
  isFacturable: boolean
) {
  try {
    const { data, error, status } = await supabase
      .from("Ticket")
      .update({
        IdTicketStatus: isFacturable
          ? ConstantTicketStatus.ATENDIDO
          : ConstantTicketStatus.FINALIZADO,
        IdTicketType: isFacturable
          ? ConstantTicketTypes.FACTURABLE
          : ConstantTicketTypes.NO_FACTURABLE,
        AppointmentDate: request.StepOne.ScheduledAppointmentInitTime,
        FoundFailure: request.StepTwo.FoundFailure,
        DeviceOne: request.StepTwo.DeviceOne,
        SeriesNumberOne: request.StepTwo.SeriesNumberOne,
        CounterOne: request.StepTwo.CounterOne,
        GuideOne: request.StepTwo.GuideOne,
        DeviceTwo: request.StepTwo.DeviceTwo,
        SeriesNumberTwo: request.StepTwo.SeriesNumberTwo,
        CounterTwo: request.StepTwo.CounterTwo,
        GuideTwo: request.StepTwo.GuideTwo,
        Comment: request.StepSix.Comment,
        Recommendation: request.StepSix.Recommendation,
        ResponsibleName: request.StepSix.ResponsibleName,
        ResponsibleDni: request.StepSix.ResponsibleDni,
        TechnicianName: request.StepSix.TechnicianName,
        TechnicianDni: request.StepSix.TechnicianDni,
      })
      .eq("IdTicket", idTicket)
      .select("IdTicket")

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar ticket", error)
    return error
  }
}

async function registerTicketStepFour(
  // request: TicketRegisterStepTwoRequest,
  idTicket: string
) {
  try {
    const { data, error, status } = await supabase
      .from("Ticket")
      .update({
        IdTicketStatus: ConstantTicketStatus.FINALIZADO,
      })
      .eq("IdTicket", idTicket)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar ticket", error)
    return error
  }
}

async function cancelTicket(idTicket: string) {
  try {
    const { data, error, status } = await supabase
      .from("Ticket")
      .update({
        IdTicketStatus: ConstantTicketStatus.CANCELADO,
      })
      .eq("IdTicket", idTicket)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al cancelar ticket", error)
    return error
  }
}

async function ticketRegisterAndUploadImage(
  request: TicketRegisterAndUploadImage
) {
  const res = await uploadTicketFiles(request.imgName, request.file)

  try {
    const { data, error, status } = await supabase
      .from("TicketFile")
      .insert([
        {
          IdTicket: request.IdTicket,
          FileUrl: res.path,
          FilePurpose: request.FilePurpose,
        },
      ])
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar ticket", error)
    return error
  }
}

async function uploadTicketFiles(imgName: string, file: File) {
  try {
    const { data, error } = await supabase.storage
      .from("media")
      .upload("tickets" + "/" + imgName, file)

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al subir imagen", error)
    return error
  }
}

export const TicketService = {
  getTickets,
  getFilteredTickets,
  getTicketById,
  getTicketUserById,
  registerTicketStepOne,
  registerTicketStepTwo,
  registerTicketStepThree,
  registerTicketStepFour,
  cancelTicket,
  ticketRegisterAndUploadImage,
}
