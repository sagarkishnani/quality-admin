import { useEffect, useState, useRef } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMessage,
  ConstantTicketMessage,
  ConstantsMasterTable,
} from "../../../../../common/constants"
import { useFormik } from "formik"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { TicketService } from "../../../../../common/services/TicketService"
import { TextField } from "@mui/material"
import moment from "moment"
import CanvasDraw from "react-canvas-draw"
import { AiOutlineClear } from "react-icons/ai"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { MasterTable } from "../../../../../common/interfaces/MasterTable.interface"
import { MasterTableService } from "../../../../../common/services/MasterTableService"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { ModalTicket } from "./ModalTicket/ModalTicket"

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

export const TicketRegisterViewFormSix = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [isModalTicketOpen, setIsModalTicketOpen] = useState(false)
  const [modalTicketType, setModalTicketType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalTicketMessage, setModalTicketMessage] = useState("")
  const [modalAction, setModalAction] = useState<string | null>("cancelar")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const firstSignature = useRef(null)
  const secondSignature = useRef(null)
  const navigate = useNavigate()
  const { setTicketStep } = useTicket()

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
    }
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
    setIsLoading(false)
  }

  function previousStep() {
    setTicketStep(5)
  }

  function clearSignature(signature: number) {
    signature == 1
      ? firstSignature?.current.clear()
      : secondSignature?.current.clear()
  }

  function registerTicketStep(isNext: boolean) {
    isNext ? setTicketStep(7) : setTicketStep(5)
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
      Extra: "",
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
        ReportedFailure: "",
        FoundFailure: "",
        Extra: "",
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
          <label>Comentario</label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2"
            disabled
            name="CounterOne"
            id="CounterOne"
            rows={1}
            value={formik.values.CounterOne}
          ></textarea>
        </div>
        <div className="col-span-12">
          <label>Recomendaciones</label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2"
            disabled
            name="GuideOne"
            id="GuideOne"
            rows={2}
            value={formik.values.GuideOne}
          ></textarea>
        </div>
        <div className="col-span-5 border-gray-400 border-2 rounded-md">
          <CanvasDraw
            ref={firstSignature}
            canvasHeight={120}
            canvasWidth={320}
            hideInterface={true}
            brushRadius={2}
            brushColor="black"
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5 border-gray-400 border-2 rounded-md">
          <CanvasDraw
            ref={secondSignature}
            canvasHeight={120}
            canvasWidth={320}
            hideInterface={true}
            brushRadius={2}
            brushColor="black"
          />
        </div>
        <div className="col-span-5 -mt-3">
          <div className="flex justify-end pr-1">
            <button onClick={() => clearSignature(1)} type="button">
              <AiOutlineClear size={20} color={"#00A0DF"} />
            </button>
          </div>
          <p>Firma del responsable (*)</p>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5 -mt-3">
          <div className="flex justify-end pr-1">
            <button onClick={() => clearSignature(2)} type="button">
              <AiOutlineClear size={20} color={"#00A0DF"} />
            </button>
          </div>
          <p>Firma del técnico responsable</p>
        </div>
        <div className="col-span-5">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="DeviceTwo"
            name="DeviceTwo"
            value={formik.values.DeviceTwo}
            label="Nombre"
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="CounterTwo"
            name="CounterTwo"
            value={formik.values.CounterTwo}
            label="Nombre técnico"
          />
        </div>
        <div className="col-span-5">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="ReportedFailure"
            name="ReportedFailure"
            value={formik.values.ReportedFailure}
            label="DNI"
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="Extra"
            name="Extra"
            value={formik.values.Extra}
            label="DNI"
          />
        </div>
      </div>

      <div className="w-full mt-8 flex space-x-3 justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkerBlue`}
          onClick={() => registerTicketStep(false)}
          type="button"
        >
          Anterior
        </button>
        <button
          className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkGreen`}
          type="button"
          onClick={() => registerTicketStep(true)}
        >
          Siguiente
        </button>
      </div>
    </>
  )
}
