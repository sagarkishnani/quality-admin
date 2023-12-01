import { useEffect, useState } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantLocalStorage,
  ConstantsMasterTable,
} from "../../../../../common/constants"
import { useFormik } from "formik"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { TicketService } from "../../../../../common/services/TicketService"
import { Checkbox, FormControl, FormControlLabel } from "@mui/material"
import moment from "moment"
import { TimePicker } from "@mui/x-date-pickers"
import { Button } from "../../../../../common/components/Button/Button"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { MasterTable } from "../../../../../common/interfaces/MasterTable.interface"
import { MasterTableService } from "../../../../../common/services/MasterTableService"

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

export const TicketRegisterViewFormFive = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [devices, setDevices] = useState<MasterTable[]>([])
  const { user } = useAuth()
  const { setTicketStep } = useTicket()

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
    }
  }

  async function getDevices() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.DEVICES
    )
    if (data) {
      setDevices(data)
    }
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
    await getDevices()
    setIsLoading(false)
  }

  function registerTicketStep(isNext: boolean) {
    isNext ? setTicketStep(6) : setTicketStep(4)
  }

  const formik = useFormik({
    initialValues: {
      DeviceOne: "",
      CounterOne: "",
      GuideOne: "",
      DeviceTwo: "",
      CounterTwo: "",
      GuideTwo: "",
      ReportedFailure: "",
      FoundFailure: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
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
        DeviceOne: "",
        CounterOne: "",
        GuideOne: "",
        DeviceTwo: "",
        CounterTwo: "",
        GuideTwo: "",
        ReportedFailure: ticket.ReportedFailure || "",
        FoundFailure: "",
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
        <div className="col-span-12">
          <h4 className="font-semibold text-lg">Comentario</h4>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                control={<Checkbox checked disabled />}
                label="Uso de papel húmedo"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Uso de papel reciclado"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Uso de papel C grapas"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Uso de etiquetas"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Conectado a la pared"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Conectado a supresor"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Conectado a estabilizador"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Conectado a UPS"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              control={<Checkbox disabled />}
              label="Operativo"
            />
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Pegado de etiqueta garantía"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="En observación"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Equipo requiere cambio"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Equipo requiere mantenimiento"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              label="Cartucho otro proveedor"
              control={<Checkbox disabled />}
            />
            <FormControlLabel
              label="Cartucho dañado"
              control={<Checkbox disabled />}
            />
          </div>
        </div>
        <div className="col-span-3">
          <FormControlLabel
            label="Instalación"
            control={<Checkbox disabled />}
          />
        </div>
        <div className="col-span-3">
          <FormControlLabel
            label="Servicio de garantía"
            control={<Checkbox disabled />}
          />
        </div>
        <div className="col-span-3">
          <FormControlLabel
            label="Negligencia"
            control={<Checkbox checked disabled />}
          />
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              label="Visita facturable"
              control={<Checkbox disabled />}
            />
            <FormControlLabel
              label="Mantenimiento"
              control={<Checkbox disabled />}
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-16 flex space-x-3 justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkerBlue`}
          onClick={() => registerTicketStep(false)}
          type="button"
        >
          Anterior
        </button>
        <button
          className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkGreen`}
          onClick={() => registerTicketStep(true)}
          type="button"
        >
          Siguiente
        </button>
      </div>
    </>
  )
}
