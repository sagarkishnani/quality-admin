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
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material"
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

export const TicketRegisterCompleteFormThree = () => {
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
    isNext ? setTicketStep(4) : setTicketStep(2)
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
          <h4 className="font-semibold text-lg">Revisión</h4>
        </div>
        <div className="col-span-12">
          <p className="font-semibold text-xs -mt-2">
            B: BUEN ESTADO | L: LEVE DESGASTE | B: BUEN ESTADO | G: GASTADO | R:
            ROTO
          </p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bandeja 1</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bisagra de escaner</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bandeja 2</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bandeja ADF</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bandeja de salida</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Cristal de cama plana</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Conector USB</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Engranaje</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Conector RJ45</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Lámina de teplon</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Panel de control</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-semibold">Rodillo de presión</p>
        </div>
        <div className="col-span-4">
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="B" />
              <FormControlLabel value="male" control={<Radio />} label="L" />
              <FormControlLabel value="male" control={<Radio />} label="G" />
              <FormControlLabel value="male" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="w-full mt-16 flex space-x-3 justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white`}
          onClick={() => registerTicketStep(false)}
          type="button"
        >
          Anterior
        </button>
        <button
          className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white`}
          onClick={() => registerTicketStep(true)}
          type="button"
        >
          Siguiente
        </button>
      </div>
    </>
  )
}
