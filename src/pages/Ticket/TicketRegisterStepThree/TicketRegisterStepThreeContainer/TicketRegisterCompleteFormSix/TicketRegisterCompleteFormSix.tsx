import { useEffect, useState, useRef } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import { v4 as uuidv4 } from "uuid"
import {
  ConstantFilePurpose,
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMessage,
  ConstantTicketMessage,
} from "../../../../../common/constants"
import { useFormik } from "formik"
import {
  GetTicketById,
  TicketRegisterAndUploadImage,
  TicketRegisterStepThreeRequest,
} from "../../../../../common/interfaces/Ticket.interface"
import { Link, useNavigate } from "react-router-dom"
import { TicketService } from "../../../../../common/services/TicketService"
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import moment from "moment"
import CanvasDraw from "react-canvas-draw"
import { AiOutlineClear } from "react-icons/ai"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { ModalTicket } from "./ModalTicket/ModalTicket"
import { TicketAnswerService } from "../../../../../common/services/TicketAnswerService"
import { TicketRegisterStepThreePicture } from "../../../../../common/interfaces/Ticket.interface"
import { dataURLtoFile } from "../../../../../common/utils"

const validationSchema = yup.object({
  Comment: yup
    .string()
    .required("El Comentario es obligatorio")
    .min(10, "El Comentario debe tener como mínimo 10 caracteres"),
  Recommendation: yup
    .string()
    .required("La Recomendación es obligatoria")
    .min(10, "La Recomendación debe tener como mínimo 10 caracteres"),
  ResponsibleDni: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Deben ser solo números")
    .min(8, "El DNI debe tener como mínimo 8 caracteres")
    .max(8, "El DNI debe tener como máximo 8 caracteres"),
  ResponsibleName: yup.string().required("El nombre es obligatorio"),
  TechnicianDni: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Deben ser solo números")
    .min(8, "El DNI debe tener como mínimo 8 caracteres")
    .max(8, "El DNI debe tener como máximo 8 caracteres"),
  TechnicianName: yup.string().required("El nombre es obligatorio"),
})

export const TicketRegisterCompleteFormSix = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [ticketFormOne, setTicketFormOne] = useState<any>()
  const [ticketFormTwo, setTicketFormTwo] = useState<any>()
  const [ticketFormThree, setTicketFormThree] = useState<any>()
  const [ticketFormFour, setTicketFormFour] = useState<any>()
  const [ticketFormFive, setTicketFormFive] = useState<any>()
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
  const [firstSignatureImg, setFirstSignatureImg] = useState<string>("")
  const [secondSignatureImg, setSecondSignatureImg] = useState<string>("")
  const navigate = useNavigate()
  const { setTicketStep } = useTicket()

  const onChangeFirstSignature = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFirstSignatureImg(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onChangeSecondSignature = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSecondSignatureImg(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
    }
  }

  function getStepOne() {
    setTicketFormOne(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_ONE
      )
    )
  }
  function getStepTwo() {
    setTicketFormTwo(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_TWO
      )
    )
  }
  function getStepThree() {
    setTicketFormThree(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_THREE
      )
    )
  }
  function getStepFour() {
    setTicketFormFour(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_FOUR
      )
    )
  }
  function getStepFive() {
    setTicketFormFive(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_FIVE
      )
    )
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
    getStepOne()
    getStepTwo()
    getStepThree()
    getStepFour()
    getStepFive()
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

  const handleSaveCanvasOne = () => {
    if (firstSignature.current) {
      return firstSignature.current.canvas.drawing.toDataURL()
    }
  }

  const handleSaveCanvasTwo = () => {
    if (secondSignature.current) {
      return secondSignature.current.canvas.drawing.toDataURL()
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCloseTicketModal = () => {
    setIsModalTicketOpen(false)
  }

  async function registerTicketStepThree(isFacturable: boolean) {
    setIsLoadingAction(true)

    const request: TicketRegisterStepThreeRequest = {
      StepOne: ticketFormOne,
      StepTwo: ticketFormTwo,
      StepThree: ticketFormThree,
      StepFour: ticketFormFour,
      StepFive: ticketFormFive,
      StepSix: {
        Comment: formik.values.Comment,
        Recommendation: formik.values.Recommendation,
        ResponsibleSignature: validateSignature(true),
        ResponsibleDni: formik.values.ResponsibleDni,
        ResponsibleName: formik.values.ResponsibleName,
        TechnicianSignature: validateSignature(false),
        TechnicianDni: formik.values.TechnicianDni,
        TechnicianName: formik.values.TechnicianName,
      },
    }

    const { data, status: ticketStatus }: any =
      await TicketService.registerTicketStepThree(
        request,
        ticket.IdTicket,
        isFacturable
      )

    if (ticketStatus == ConstantHttpErrors.OK) {
      const { status }: any = await TicketAnswerService.registerTicketAnswer(
        data[0].IdTicket,
        request
      )

      if (status == ConstantHttpErrors.CREATED) {
        for (const picture of request.StepTwo.Pictures) {
          const picReq: TicketRegisterAndUploadImage = {
            IdTicket: ticket.IdTicket,
            file: dataURLtoFile(picture.Content),
            FilePurpose: ConstantFilePurpose.IMAGEN_TECNICO,
            imgName: uuidv4(),
          }

          const { status: picStatus }: any =
            await TicketService.ticketRegisterAndUploadImage(picReq)

          if (
            picStatus !== ConstantHttpErrors.CREATED &&
            picStatus !== ConstantHttpErrors.OK
          ) {
            setIsLoadingAction(false)
            setIsModalOpen(true)
            setModalType("error")
            setModalMessage(ConstantTicketMessage.TICKET_IMAGE_ERROR)
            return
          }

          const signOneRequest: TicketRegisterAndUploadImage = {
            IdTicket: ticket.IdTicket,
            file: dataURLtoFile(request.StepSix.ResponsibleSignature.Content),
            FilePurpose: request.StepSix.ResponsibleSignature.FilePurpose,
            imgName: uuidv4(),
          }

          const { status: signOneStatus }: any =
            await TicketService.ticketRegisterAndUploadImage(signOneRequest)

          if (
            signOneStatus !== ConstantHttpErrors.CREATED &&
            signOneStatus !== ConstantHttpErrors.OK
          ) {
            setIsLoadingAction(false)
            setIsModalOpen(true)
            setModalType("error")
            setModalMessage(ConstantTicketMessage.TICKET_SIGNATURE_ERROR)
            return
          }

          const signTwoRequest: TicketRegisterAndUploadImage = {
            IdTicket: ticket.IdTicket,
            file: dataURLtoFile(request.StepSix.TechnicianSignature.Content),
            FilePurpose: request.StepSix.TechnicianSignature.FilePurpose,
            imgName: uuidv4(),
          }

          const { status: signTwoStatus }: any =
            await TicketService.ticketRegisterAndUploadImage(signTwoRequest)

          if (
            signTwoStatus !== ConstantHttpErrors.CREATED &&
            signTwoStatus !== ConstantHttpErrors.OK
          ) {
            setIsLoadingAction(false)
            setIsModalOpen(true)
            setModalType("error")
            setModalMessage(ConstantTicketMessage.TICKET_SIGNATURE_ERROR)
            return
          }
        }
        setIsModalTicketOpen(false)
        setIsModalOpen(true)
        setModalType("success")
        setModalMessage(
          isFacturable
            ? ConstantTicketMessage.TICKET_ATTENDED_SUCCESS
            : ConstantTicketMessage.TICKET_FINISHED_SUCCESS
        )
        setIsLoadingAction(false)
        setTimeout(() => {
          navigate("/tickets")
        }, 2000)
      } else {
        setIsModalTicketOpen(false)
        setIsLoadingAction(false)
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantMessage.SERVICE_ERROR)
      }
    }
  }

  const validateSignature = (
    isResponsible: boolean
  ): TicketRegisterStepThreePicture => {
    if (formik.values.Firma == "U") {
      return {
        Content: isResponsible ? firstSignatureImg : secondSignatureImg,
        FilePurpose: isResponsible
          ? ConstantFilePurpose.FIRMA_USUARIO
          : ConstantFilePurpose.FIRMA_TECNICO,
      }
    } else {
      return {
        Content: isResponsible ? handleSaveCanvasOne() : handleSaveCanvasTwo(),
        FilePurpose: isResponsible
          ? ConstantFilePurpose.FIRMA_USUARIO
          : ConstantFilePurpose.FIRMA_TECNICO,
      }
    }
  }

  const handleFacturable = () => {
    registerTicketStepThree(true)
  }

  const handleNoFacturable = () => {
    registerTicketStepThree(false)
  }

  const handleForm = () => {
    setIsModalTicketOpen(true)
    setModalTicketType("question")
    setModalTicketMessage(ConstantTicketMessage.TICKET_FACTURABLE)
    setModalAction("cancelar")
  }

  const formik = useFormik({
    initialValues: {
      Comment: "",
      Recommendation: "",
      Firma: "",
      ResponsibleName: "",
      ResponsibleDni: "",
      TechnicianName: "",
      TechnicianDni: "",
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
            required
            name="Comment"
            id="Comment"
            rows={2}
            value={formik.values.Comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          <div className="flex justify-between">
            {formik.touched.Comment && formik.errors.Comment ? (
              <p className="text-qRed text-sm">{formik.errors.Comment}</p>
            ) : (
              <div></div>
            )}
            <small className="text-right block">
              {formik.values.Comment.length}/100
            </small>
          </div>
        </div>
        <div className="col-span-12">
          <label>Recomendaciones</label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2"
            required
            name="Recommendation"
            id="Recommendation"
            rows={2}
            value={formik.values.Recommendation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          <div className="flex justify-between">
            {formik.touched.Recommendation && formik.errors.Recommendation ? (
              <p className="text-qRed text-sm">
                {formik.errors.Recommendation}
              </p>
            ) : (
              <div></div>
            )}
            <small className="text-right block">
              {formik.values.Recommendation.length}/100
            </small>
          </div>
        </div>
        <div className="col-span-12">
          <FormControl>
            <RadioGroup
              row
              id="Firma"
              name="Firma"
              value={formik.values.Firma}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="U"
                control={<Radio />}
                label="Subir imágenes"
              />
              <FormControlLabel
                value="W"
                control={<Radio />}
                label="Escribir firmas"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {formik.values.Firma === "W" && (
          <>
            <div className="col-span-5 border-gray-400 border-2 rounded-md relative h-32">
              <CanvasDraw
                ref={firstSignature}
                canvasHeight={120}
                canvasWidth={320}
                hideInterface={true}
                brushRadius={2}
                brushColor="black"
                // className="absolute"
              />
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-5 border-gray-400 border-2 rounded-md relative h-32">
              <CanvasDraw
                ref={secondSignature}
                canvasHeight={120}
                canvasWidth={320}
                hideInterface={true}
                brushRadius={2}
                brushColor="black"
                // className="absolute"
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
          </>
        )}
        {formik.values.Firma === "U" && (
          <>
            <div className="col-span-5">
              <div className="flex flex-row space-x-2">
                <div className="register_profile_image">
                  <input
                    type="file"
                    accept=".png, .jpg, .gif, .svg, .webp"
                    onChange={onChangeFirstSignature}
                    className="border-none bg-none text-qBlue underline font-medium"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-5">
              <div className="flex flex-row space-x-2">
                <div className="register_profile_image">
                  <input
                    type="file"
                    accept=".png, .jpg, .gif, .svg, .webp"
                    onChange={onChangeSecondSignature}
                    className="border-none bg-none text-qBlue underline font-medium"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <p>Firma del responsable (*)</p>
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-5">
              <p>Firma del técnico responsable</p>
            </div>
          </>
        )}
        <div className="col-span-5">
          <TextField
            required
            color="primary"
            className="w-full"
            id="ResponsibleName"
            name="ResponsibleName"
            value={formik.values.ResponsibleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.ResponsibleName &&
              Boolean(formik.errors.ResponsibleName)
            }
            helperText={
              formik.touched.ResponsibleName && formik.errors.ResponsibleName
            }
            label="Nombre"
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5">
          <TextField
            required
            color="primary"
            className="w-full"
            id="TechnicianName"
            name="TechnicianName"
            value={formik.values.TechnicianName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.TechnicianName &&
              Boolean(formik.errors.TechnicianName)
            }
            helperText={
              formik.touched.TechnicianName && formik.errors.TechnicianName
            }
            label="Nombre técnico"
          />
        </div>
        <div className="col-span-5">
          <TextField
            required
            color="primary"
            className="w-full"
            id="ResponsibleDni"
            name="ResponsibleDni"
            value={formik.values.ResponsibleDni}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.ResponsibleDni &&
              Boolean(formik.errors.ResponsibleDni)
            }
            helperText={
              formik.touched.ResponsibleDni && formik.errors.ResponsibleDni
            }
            label="DNI"
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5">
          <TextField
            required
            color="primary"
            className="w-full"
            id="TechnicianDni"
            name="TechnicianDni"
            value={formik.values.TechnicianDni}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.TechnicianDni &&
              Boolean(formik.errors.TechnicianDni)
            }
            helperText={
              formik.touched.TechnicianDni && formik.errors.TechnicianDni
            }
            label="DNI"
          />
        </div>
      </div>

      <div className="w-full mt-8 flex space-x-3 justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkerBlue`}
          onClick={previousStep}
          type="button"
        >
          Anterior
        </button>
        <button
          className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkGreen`}
          type="button"
          onClick={handleForm}
        >
          Finalizar
        </button>
      </div>
      <ModalTicket
        handleClose={handleCloseTicketModal}
        modalType={modalTicketType}
        title={modalTicketMessage}
        open={isModalTicketOpen}
        handleActionOne={handleNoFacturable}
        handleActionTwo={handleFacturable}
        // handleAction={handleCancelBtn}
        action={modalAction}
      />
      <Modal
        modalType={modalType}
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
    </>
  )
}
