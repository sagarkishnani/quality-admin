import { useEffect, useState, useRef } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantLocalStorage,
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
import { ImageModal } from "../../../../../common/components/ImageModal/ImageModal"

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

export const TicketRegisterCompleteFormSix = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [modalAction, setModalAction] = useState<string | null>("cancelar")
  const firstSignature = useRef(null)
  const secondSignature = useRef(null)
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

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleForm = () => {
    setIsModalOpen(true)
    setModalType("question")
    setModalMessage(ConstantTicketMessage.TICKET_FACTURABLE)
    setModalAction("cancelar")
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
          <TextField
            color="primary"
            className="w-full"
            id="CounterOne"
            name="CounterOne"
            value={formik.values.CounterOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.CounterOne && Boolean(formik.errors.CounterOne)
            }
            helperText={formik.touched.CounterOne && formik.errors.CounterOne}
            label="Comentario"
          />
        </div>
        <div className="col-span-12">
          <TextField
            color="primary"
            className="w-full"
            id="GuideOne"
            name="GuideOne"
            value={formik.values.GuideOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GuideOne && Boolean(formik.errors.GuideOne)}
            helperText={formik.touched.GuideOne && formik.errors.GuideOne}
            label="Recomendaciones"
          />
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
            required
            color="primary"
            className="w-full"
            id="GuideOne"
            name="GuideOne"
            value={formik.values.GuideOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GuideOne && Boolean(formik.errors.GuideOne)}
            helperText={formik.touched.GuideOne && formik.errors.GuideOne}
            label="Nombre"
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5">
          <TextField
            required
            color="primary"
            className="w-full"
            id="GuideOne"
            name="GuideOne"
            value={formik.values.GuideOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GuideOne && Boolean(formik.errors.GuideOne)}
            helperText={formik.touched.GuideOne && formik.errors.GuideOne}
            label="Nombre técnico"
          />
        </div>
        <div className="col-span-5">
          <TextField
            required
            color="primary"
            className="w-full"
            id="GuideOne"
            name="GuideOne"
            value={formik.values.GuideOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GuideOne && Boolean(formik.errors.GuideOne)}
            helperText={formik.touched.GuideOne && formik.errors.GuideOne}
            label="DNI"
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5">
          <TextField
            required
            color="primary"
            className="w-full"
            id="GuideOne"
            name="GuideOne"
            value={formik.values.GuideOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GuideOne && Boolean(formik.errors.GuideOne)}
            helperText={formik.touched.GuideOne && formik.errors.GuideOne}
            label="DNI"
          />
        </div>
      </div>

      <div className="w-full mt-8 flex space-x-3 justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white`}
          onClick={previousStep}
          type="button"
        >
          Anterior
        </button>
        <button
          className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white`}
          type="button"
          onClick={handleForm}
        >
          Finalizar
        </button>
      </div>
      <ModalTicket
        handleClose={handleCloseModal}
        modalType={modalType}
        title={modalMessage}
        open={isModalOpen}
        // handleAction={handleCancelBtn}
        action={modalAction}
      />
    </>
  )
}
