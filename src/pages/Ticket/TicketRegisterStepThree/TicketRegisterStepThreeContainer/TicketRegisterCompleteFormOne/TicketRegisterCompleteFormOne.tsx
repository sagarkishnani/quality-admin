import { useEffect, useState } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import { ConstantLocalStorage } from "../../../../../common/constants"
import { useFormik } from "formik"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { MasterTable } from "../../../../../common/interfaces/MasterTable.interface"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { TicketService } from "../../../../../common/services/TicketService"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import moment from "moment"
import { TimePicker } from "@mui/x-date-pickers"

const validationSchema = yup.object({
  // Dni: yup
  //   .string()
  //   .required()
  //   .matches(/^[0-9]+$/, "Deben ser solo números")
  //   .min(8, "El DNI debe tener como mínimo 8 caracteres")
  //   .max(8, "El DNI debe tener como máximo 8 caracteres"),
  // Name: yup
  //   .string()
  //   .required("Nombre es obligatorio")
  //   .min(3, "El Nombre debe tener como mínimo 3 caracteres"),
  // PhoneNumber: yup.number().required("Celular es obligatorio"),
  // IdRole: yup.string().required("Rol es obligatorio"),
  // IdCompany: yup.string().required("Empresa es obligatorio"),
  // Position: yup.string().required("Cargo es obligatorio"),
  // email: yup
  //   .string()
  //   .required("Correo es obligatorio")
  //   .email("Debe ser un correo"),
  // password: yup
  //   .string()
  //   .min(6, "La contraseña debe tener como mínimo 6 caracteres")
  //   .required("Contraseña es obligatoria"),
})

export const TicketRegisterCompleteFormOne = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [technicians, setTechnicians] = useState<any[]>([])
  const [pictures, setPictures] = useState<string[]>([])
  const [imgData, setImgData] = useState("")
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
      console.log(data)
    }
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
    // await getTechnicians()
    // await getPositions()
    // await getAreas()
    // await getFloors()
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      IdTicketStatus: "",
      IdTicketCompany: "",
      IdTicketType: "",
      Address: "",
      CompanyFloor: "",
      CompanyArea: "",
      IdTechnician: "",
      IdUser: "",
      ScheduledAppointmentTime: new Date(),
      ScheduledAppointmentDate: new Date(),
      ReportedFailure: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //   registerTicketStepTwo(values)
    },
  })

  useEffect(() => {
    const idTicket = secureLocalStorage.getItem(ConstantLocalStorage.ID_TICKET)
    if (idTicket !== null) {
      getAll(idTicket)
    }
  }, [])

  useEffect(() => {
    if (ticket) {
      formik.setValues({
        IdTicketStatus: ticket.IdTicketStatus || "",
        IdTicketCompany: ticket.Company.Name || "",
        IdTicketType: ticket.IdTicketType || "",
        Address: ticket.Company.Address || "",
        CompanyFloor: ticket.CompanyFloor || "",
        CompanyArea: ticket.CompanyArea || "",
        IdUser: "",
        IdTechnician: "",
        ScheduledAppointmentTime: new Date(),
        ScheduledAppointmentDate: new Date(),
        ReportedFailure: ticket.ReportedFailure || "",
      })
    }
  }, [ticket])

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <h2 className="font-semibold text-xl pb-2">
            Reporte de servicio técnico
          </h2>
        </div>
        <div className="col-span-4 justify-end flex">
          <h2 className="font-semibold text-qGray pb-2">
            {moment(ticket?.RecordCreationDate).format("DD/MM/YYYY")}
          </h2>
        </div>
        <div className="col-span-6">
          <InputLabel id="ScheduledAppointmentTime">Hora inicio</InputLabel>
          <TimePicker
            className="w-full"
            value={moment(formik.values.ScheduledAppointmentTime)}
            onChange={(value) =>
              formik.setFieldValue("ScheduledAppointmentTime", value, true)
            }
          />
        </div>
        <div className="col-span-6">
          <InputLabel id="ScheduledAppointmentTime">Hora fin</InputLabel>
          <TimePicker
            className="w-full"
            value={moment(formik.values.ScheduledAppointmentTime)}
            onChange={(value) =>
              formik.setFieldValue("ScheduledAppointmentTime", value, true)
            }
          />
        </div>
        <div className="col-span-6">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="IdTicketCompany"
            name="IdTicketCompany"
            value={formik.values.IdTicketCompany}
            label="Empresa"
          />
        </div>
        <div className="col-span-6">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="Address"
            name="Address"
            value={formik.values.Address}
            label="Dirección"
          />
        </div>
        <div className="col-span-6">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="CompanyFloor"
            name="CompanyFloor"
            value={formik.values.CompanyFloor}
            label="Piso"
          />
        </div>
        <div className="col-span-6">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="CompanyArea"
            name="CompanyArea"
            value={formik.values.CompanyArea}
            label="Área"
          />
        </div>
        <div className="col-span-12">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="User"
            name="User"
            value={formik.values.IdUser}
            label="Usuario"
          />
        </div>
      </div>
    </>
  )
}
