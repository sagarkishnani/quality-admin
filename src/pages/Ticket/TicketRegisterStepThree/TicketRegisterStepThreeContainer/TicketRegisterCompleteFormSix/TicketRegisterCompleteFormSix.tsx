import { useEffect, useState, useRef } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import { v4 as uuidv4 } from "uuid"
import {
  ConstantFilePurpose,
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMailConfigNonFacturable,
  ConstantMessage,
  ConstantTicketMessage,
  ConstantTicketStatus,
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
  Alert,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Switch,
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
import {
  dataURLtoFile,
  generateMailFacturable,
  generateMailNotFacturable,
} from "../../../../../common/utils"
import TechnicalServiceReport from "../../../../../common/mailTemplates/technicalServiceReport"
import ReactDOMServer from "react-dom/server"
import html2pdf from "html2pdf.js"
import {
  Attachement,
  MailService,
  SendEmailRequest,
} from "../../../../../common/services/MailService"
import { RegisterNotificationRequest } from "../../../../../common/interfaces/Notification.interface"
import { NotificationService } from "../../../../../common/services/NotificationService"
import { UserService } from "../../../../../common/services/UserService"

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
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingActionNonFacturable, setIsLoadingActionNonFacturable] =
    useState<boolean>(false)
  const [isLoadingActionFacturable, setIsLoadingActionFacturable] =
    useState<boolean>(false)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [technician, setTechnician] = useState(null)
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
  const [open, setOpen] = useState(false)
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

  async function getTechnician(idUser: string) {
    const data = await UserService.getUserById(idUser)
    if (data) {
      setTechnician(data)
    }
  }

  async function getTicketById(idTicket: string) {
    const data: GetTicketById = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
      if (data?.IdTechnician !== null) await getTechnician(data?.IdTechnician)
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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  async function registerNotification(request: RegisterNotificationRequest) {
    const { status } = await NotificationService.registerNotification(request)

    if (
      status !== ConstantHttpErrors.CREATED &&
      status !== ConstantHttpErrors.OK
    ) {
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage("Error al registrar notificación")
      return false
    } else {
      return true
    }
  }

  async function registerTicketStepThree(isFacturable: boolean) {
    let dataSignatureOne = {}
    let dataSignatureTwo = {}

    if (isFacturable) setIsLoadingActionFacturable(true)
    if (!isFacturable) setIsLoadingActionNonFacturable(true)

    const request: TicketRegisterStepThreeRequest = {
      StepOne: ticketFormOne,
      StepTwo: ticketFormTwo,
      StepThree: ticketFormThree,
      StepFour: ticketFormFour,
      StepFive: ticketFormFive,
      StepSix: {
        Comment: formik.values.Comment,
        Recommendation: formik.values.Recommendation,
        ResponsibleSignature: validateSignatureOne(),
        ResponsibleDni: formik.values.ResponsibleDni,
        ResponsibleName: formik.values.ResponsibleName,
        TechnicianSignature: validateSignatureTwo(),
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
            if (isFacturable) setIsLoadingActionFacturable(false)
            if (!isFacturable) setIsLoadingActionNonFacturable(false)
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

          const { status: signOneStatus, data: dataSignOne }: any =
            await TicketService.ticketRegisterAndUploadImage(signOneRequest)

          if (dataSignOne) dataSignatureOne = dataSignOne[0]
          if (
            signOneStatus !== ConstantHttpErrors.CREATED &&
            signOneStatus !== ConstantHttpErrors.OK
          ) {
            if (isFacturable) setIsLoadingActionFacturable(false)
            if (!isFacturable) setIsLoadingActionNonFacturable(false)
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

          const { status: signTwoStatus, data: dataSignTwo }: any =
            await TicketService.ticketRegisterAndUploadImage(signTwoRequest)

          if (dataSignTwo) dataSignatureTwo = dataSignTwo[0]
          if (
            signTwoStatus !== ConstantHttpErrors.CREATED &&
            signTwoStatus !== ConstantHttpErrors.OK
          ) {
            if (isFacturable) setIsLoadingActionFacturable(false)
            if (!isFacturable) setIsLoadingActionNonFacturable(false)
            setIsModalOpen(true)
            setModalType("error")
            setModalMessage(ConstantTicketMessage.TICKET_SIGNATURE_ERROR)
            return
          }
        }

        if (dataSignatureOne && dataSignatureTwo) {
          const pdfData = {
            RecordCreationDate: moment(
              request.StepOne.AppointmentInitTime
            ).format("DD/MM/YYYY"),
            AppointmentInitTime: moment(
              request.StepOne.AppointmentInitTime
            ).format("HH:mm"),
            AppointmentEndTime: moment(
              request.StepOne.AppointmentEndTime
            ).format("HH:mm"),
            Company: ticket?.Company.Name,
            Address: ticket?.Local
              ? ticket?.Local.Address
              : ticket?.Company.Address,
            Local: ticket?.Local ? ticket?.Local.Name : ticket?.Company.Local,
            CompanyFloor: ticket?.CompanyFloor,
            CompanyArea: ticket?.CompanyArea,
            User: ticket?.User.Name,
            DeviceOne: request.StepTwo.DeviceOneValue,
            SeriesNumberOne: request.StepTwo.SeriesNumberOne,
            CounterOne: request.StepTwo.CounterOne,
            GuideOne: request.StepTwo.GuideOne,
            DeviceTwo: request.StepTwo.DeviceTwoValue,
            SeriesNumberTwo: request.StepTwo.SeriesNumberTwo,
            CounterTwo: request.StepTwo.CounterTwo,
            GuideTwo: request.StepTwo.GuideTwo,
            ReportedFailure: ticket?.ReportedFailure,
            FoundFailure: request.StepTwo.FoundFailure,
            Revision: {
              BandejaUno: request.StepThree.BandejaUno,
              BandejaDos: request.StepThree.BandejaDos,
              BandejaSalida: request.StepThree.BandejaSalida,
              BisagraEscaner: request.StepThree.BisagraEscaner,
              BandejaADF: request.StepThree.BandejaADF,
              CristalCamaPlana: request.StepThree.CristalCamaPlana,
              ConectorUSB: request.StepThree.ConectorUSB,
              ConectorRJ: request.StepThree.ConectorRJ,
              PanelControl: request.StepThree.PanelControl,
              Engranaje: request.StepThree.Engranaje,
              LaminaTeplon: request.StepThree.LaminaTeplon,
              RodilloPresion: request.StepThree.RodilloPresion,
            },
            Procedure: {
              Instalacion: request.StepFour.Instalacion ? "X" : "",
              Cambio: request.StepFour.Cambio ? "X" : "",
              Mantenimiento: request.StepFour.Mantenimiento ? "X" : "",
              Reparacion: request.StepFour.Reparacion ? "X" : "",
              Retiro: request.StepFour.Retiro ? "X" : "",
              Revision: request.StepFour.Revision ? "X" : "",
              MantImpresora: request.StepFour.MantImpresora ? "X" : "",
              MantOptico: request.StepFour.MantOptico ? "X" : "",
              MantOpticoEscaner: request.StepFour.MantOpticoEscaner ? "X" : "",
              MantSistema: request.StepFour.MantSistema ? "X" : "",
              ActualFirmware: request.StepFour.ActualFirmware ? "X" : "",
              EtiquetaFusor: request.StepFour.EtiquetaFusor ? "X" : "",
              EtiquetaFusorTeflon: request.StepFour.EtiquetaFusorTeflon
                ? "X"
                : "",
              RevCartucho: request.StepFour.RevCartucho ? "X" : "",
              RevFusor: request.StepFour.RevFusor ? "X" : "",
              RevImagen: request.StepFour.RevImagen ? "X" : "",
              RevADF: request.StepFour.RevADF ? "X" : "",
              RevRodilloBUno: request.StepFour.RevRodilloBUno ? "X" : "",
              RevRodilloBDos: request.StepFour.RevRodilloBDos ? "X" : "",
              RevSeparador: request.StepFour.RevSeparador ? "X" : "",
              RevDuplex: request.StepFour.RevDuplex ? "X" : "",
              CambioCartucho: request.StepFour.CambioCartucho ? "X" : "",
              CambioFusor: request.StepFour.CambioFusor ? "X" : "",
              CambioImagen: request.StepFour.CambioImagen ? "X" : "",
              CambioRodillo: request.StepFour.CambioRodillo ? "X" : "",
              CambioTeflon: request.StepFour.CambioTeflon ? "X" : "",
              CambioRodilloBUno: request.StepFour.CambioRodilloBUno ? "X" : "",
              CambioRodilloBDos: request.StepFour.CambioRodilloBDos ? "X" : "",
              CambioSeparador: request.StepFour.CambioSeparador ? "X" : "",
              CambioDrive: request.StepFour.CambioDrive ? "X" : "",
              CambioSwing: request.StepFour.CambioSwing ? "X" : "",
              CambioAOF: request.StepFour.CambioAOF ? "X" : "",
              CambioDC: request.StepFour.CambioDC ? "X" : "",
            },
            Comments: {
              UsoPapelHumedo: request.StepFive.UsoPapelHumedo ? "X" : "",
              UsoPapelReciclado: request.StepFive.UsoPapelReciclado ? "X" : "",
              UsoPapelGrapas: request.StepFive.UsoPapelGrapas ? "X" : "",
              UsoEtiquetas: request.StepFive.UsoEtiquetas ? "X" : "",
              ConectadoPared: request.StepFive.ConectadoPared ? "X" : "",
              ConectadoSupresor: request.StepFive.ConectadoSupresor ? "X" : "",
              ConectadoEstabilizador: request.StepFive.ConectadoEstabilizador
                ? "X"
                : "",
              ConectadoUPS: request.StepFive.ConectadoUPS ? "X" : "",
              Operativo: request.StepFive.Operativo ? "X" : "",
              PegadoEtiquetaGarantia: request.StepFive.PegadoEtiquetaGarantia
                ? "X"
                : "",
              EnObservacion: request.StepFive.EnObservacion ? "X" : "",
              EquipoRequiereCambio: request.StepFive.EquipoRequiereCambio
                ? "X"
                : "",
              EquipoRequiereMantenimiento: request.StepFive
                .EquipoRequiereMantenimiento
                ? "X"
                : "",
              CartuchoOtroProveedor: request.StepFive.CartuchoOtroProveedor
                ? "X"
                : "",
              CartuchoDanado: request.StepFive.CartuchoDanado ? "X" : "",
            },
            Instalacion: request.StepFive.Instalacion ? "X" : "",
            ServicioGarantia: request.StepFive.ServicioGarantia ? "X" : "",
            Negligencia: request.StepFive.Negligencia ? "X" : "",
            Mantenimiento: request.StepFive.Mantenimiento ? "X" : "",
            FacturableVisit: isFacturable ? "X" : "",
            Comment: request.StepSix.Comment,
            Recommendation: request.StepSix.Recommendation,
            Signature: {
              ResponsibleName: request.StepSix.ResponsibleName,
              ResponsibleDni: request.StepSix.ResponsibleDni,
              ResponsibleSignature: `${supabaseUrl}/storage/v1/object/public/media/${dataSignatureOne.FileUrl}`,
              TechnicianName: request.StepSix.TechnicianName,
              TechnicianSignature: `${supabaseUrl}/storage/v1/object/public/media/${dataSignatureTwo.FileUrl}`,
            },
          }

          const printElement = ReactDOMServer.renderToString(
            TechnicalServiceReport({ data: pdfData })
          )
          const opt = {
            format: "a4",
            filename: `${ticket?.CodeTicket}.pdf`,
            margin: 1,
            html2canvas: {
              dpi: 192,
              scale: 4,
              letterRendering: true,
              useCORS: true,
            },
            devicePixelRatio: 1.5,
          }

          html2pdf().from(printElement).set(opt).save()

          html2pdf()
            .from(printElement)
            .set(opt)
            .outputPdf()
            .then(async (pdf) => {
              const base64 = btoa(pdf)

              const attachments: Attachement = {
                filename: `${ticket?.CodeTicket}.pdf`,
                content: base64,
              }

              let companyMails: string[] = []

              if (ticket?.Local?.Mails) {
                companyMails = ticket?.Local?.Mails.split(",")
              } else if (ticket?.Local?.Mails == null) {
                companyMails = ticket?.Company?.Mails.split(",")
              } else {
                companyMails = []
              }

              isFacturable
                ? companyMails?.push("asistente.adm@qualitysumprint.com")
                : companyMails?.push("soporte.tecnico@qualitysumprint.com")

              const requestMail: SendEmailRequest = {
                from: ConstantMailConfigNonFacturable.FROM,
                to: companyMails,
                subject: isFacturable
                  ? "Atención del servicio - Facturable"
                  : "Finalización servicio - No facturable",
                html: generateMailNotFacturable(
                  ticket?.User.Name,
                  ticket?.Company.Name,
                  isFacturable,
                  ticket?.Company.RequiresOrder,
                  ticket?.CodeTicket.toString()
                ),
                attachments: [attachments],
              }

              let res

              if (!isFacturable) {
                res = await MailService.sendEmail(requestMail)
              }

              if (isFacturable || (!isFacturable && res?.ok)) {
                const requestNotification: RegisterNotificationRequest = {
                  IdTicket: ticket.IdTicket,
                  CodeTicket: ticket.CodeTicket,
                  IdCompany: ticket.IdTicketCompany,
                  IdTechnician: ticket.IdTechnician,
                  IdTicketStatus: isFacturable
                    ? ConstantTicketStatus.ATENDIDO
                    : ConstantTicketStatus.FINALIZADO,
                  IdUser: ticket.IdUser,
                }

                await registerNotification(requestNotification)

                setIsModalTicketOpen(false)
                setIsModalOpen(true)
                setModalType("success")
                setModalMessage(
                  isFacturable
                    ? ConstantTicketMessage.TICKET_ATTENDED_SUCCESS
                    : ConstantTicketMessage.TICKET_FINISHED_SUCCESS
                )
                if (isFacturable) setIsLoadingActionFacturable(false)
                if (!isFacturable) setIsLoadingActionNonFacturable(false)
                setTimeout(() => {
                  navigate("/tickets")
                }, 2000)
              } else {
                if (isFacturable) setIsLoadingActionFacturable(false)
                if (!isFacturable) setIsLoadingActionNonFacturable(false)
                setIsModalOpen(true)
                setModalType("error")
                setModalMessage(
                  ConstantTicketMessage.TICKET_MAIL_REGISTER_ERROR
                )
                setTimeout(() => {
                  navigate("/tickets")
                }, 2000)
              }
            })
        }

        return (
          <>
            <TechnicalServiceReport data={pdfData}></TechnicalServiceReport>
          </>
        )
      } else {
        setIsModalTicketOpen(false)
        if (isFacturable) setIsLoadingActionFacturable(false)
        if (!isFacturable) setIsLoadingActionNonFacturable(false)
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantMessage.SERVICE_ERROR)
      }
    }
  }

  const validateSignatureOne = (): TicketRegisterStepThreePicture => {
    if (formik.values.Firma == "U") {
      return {
        Content: firstSignatureImg,
        FilePurpose: ConstantFilePurpose.FIRMA_USUARIO,
      }
    } else {
      return {
        Content: handleSaveCanvasOne(),
        FilePurpose: ConstantFilePurpose.FIRMA_USUARIO,
      }
    }
  }

  const validateSignatureTwo = (): TicketRegisterStepThreePicture => {
    if (formik.values.FirmaDos == "U") {
      return {
        Content: secondSignatureImg,
        FilePurpose: ConstantFilePurpose.FIRMA_TECNICO,
      }
    } else {
      return {
        Content: handleSaveCanvasTwo(),
        FilePurpose: ConstantFilePurpose.FIRMA_TECNICO,
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
    if (formik.values.Firma == "") return handleOpen()
    if (formik.values.FirmaDos == "") return handleOpen()
    if (formik.values.Firma == "W" && firstSignature.current == null)
      return handleOpen()
    if (formik.values.FirmaDos == "W" && secondSignature.current == null)
      return handleOpen()
    if (formik.values.Firma == "U" && firstSignatureImg == "")
      return handleOpen()
    if (formik.values.FirmaDos == "U" && secondSignatureImg == "")
      return handleOpen()

    setIsModalTicketOpen(true)
    setModalTicketType("question")
    setModalTicketMessage(ConstantTicketMessage.TICKET_FACTURABLE)
    setModalAction("cancelar")
  }

  const formik = useFormik({
    initialValues: {
      RequiresOrder: false,
      Comment: "",
      Recommendation: "",
      Firma: "",
      FirmaDos: "",
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

  useEffect(() => {
    if (ticket) {
      formik.setValues({
        TechnicianDni: technician?.Dni == null ? "" : technician?.Dni,
        TechnicianName: technician?.Name == null ? "" : technician?.Name,
        RequiresOrder: false,
        Comment: "",
        Recommendation: "",
        Firma: "",
        FirmaDos: "",
        ResponsibleName: "",
        ResponsibleDni: "",
      })
    }
  }, [ticket, technician])

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-semibold text-xl pb-2">
            Reporte de servicio técnico
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4 justify-end flex">
          <h2 className="font-semibold text-qGray pb-2">
            {moment(ticket?.RecordCreationDate).format("DD/MM/YYYY")}
          </h2>
        </div>
        <div className="col-span-12">
          <FormControlLabel
            name="RequiresOrder"
            id="RequiresOrder"
            control={
              <Switch disabled checked={ticket?.Company.RequiresOrder} />
            }
            label="Requiere orden de compra"
          />
        </div>
        <div className="col-span-12">
          <label>Comentario</label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2"
            required
            placeholder="Escribir comentario..."
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
            placeholder="Escribir recomendaciones para el usuario..."
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
        <div className="col-span-12 md:col-span-5">
          <label className="md:hidden">Firma del responsable</label>
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
          {formik.values.Firma === "U" && (
            <>
              <div className="pt-4 order-1 md:order-none col-span-12 md:col-span-5">
                <div className="flex flex-col md:flex-row md:space-x-2">
                  <div className="register_profile_image overflow-x-hidden">
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg, .gif, .svg, .webp"
                      onChange={onChangeFirstSignature}
                      className="border-none bg-none text-qBlue underline font-medium"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 order-2 md:order-none col-span-12 md:col-span-5">
                <p>Firma del responsable (*)</p>
              </div>
            </>
          )}
          {formik.values.Firma === "W" && (
            <>
              <div className="order-1 md:order-none col-span-12 md:col-span-5 border-gray-400 border-2 rounded-md relative h-32">
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
              <div className="order-2 md:order-none col-span-12 md:col-span-5 mt-1">
                <div className="flex justify-end pr-1">
                  <button onClick={() => clearSignature(1)} type="button">
                    <AiOutlineClear size={20} color={"#00A0DF"} />
                  </button>
                </div>
                <p>Firma del responsable (*)</p>
              </div>
            </>
          )}
        </div>
        <div className="hidden md:block col-span-12 md:col-span-2"></div>
        <div className="col-span-12 md:col-span-5">
          <label className="md:hidden">Firma del técnico</label>
          <FormControl>
            <RadioGroup
              row
              id="FirmaDos"
              name="FirmaDos"
              value={formik.values.FirmaDos}
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
          {formik.values.FirmaDos === "U" && (
            <>
              <div className="pt-4 order-5 md:order-none col-span-12 md:col-span-5">
                <div className="flex flex-col md:flex-row md:space-x-2">
                  <div className="register_profile_image overflow-x-hidden">
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg, .gif, .svg, .webp"
                      onChange={onChangeSecondSignature}
                      className="border-none bg-none text-qBlue underline font-medium"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 order-6 md:order-none col-span-12 md:col-span-5">
                <p>Firma del técnico responsable (*)</p>
              </div>
            </>
          )}
          {formik.values.FirmaDos === "W" && (
            <>
              <div className="order-5 md:order-none col-span-12 md:col-span-5 border-gray-400 border-2 rounded-md relative h-32">
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
              <div className="order-6 md:order-none col-span-12 md:col-span-5 mt-1">
                <div className="flex justify-end pr-1">
                  <button onClick={() => clearSignature(2)} type="button">
                    <AiOutlineClear size={20} color={"#00A0DF"} />
                  </button>
                </div>
                <p>Firma del técnico responsable (*)</p>
              </div>
            </>
          )}
        </div>

        <div className="order-3 md:order-none col-span-12 md:col-span-5">
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
        <div className="hidden md:block col-span-12 md:col-span-2"></div>
        <div className="order-7 md:order-none col-span-12 md:col-span-5">
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
        <div className="order-4 md:order-none col-span-12 md:col-span-5">
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
        <div className="hidden md:block col-span-12 md:col-span-2"></div>
        <div className="order-8 md:order-none col-span-12 md:col-span-5">
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

      <div className="w-full mt-8 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3 md:justify-end">
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
          disabled={!formik.isValid}
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
        isLoadingFacturable={isLoadingActionFacturable}
        isLoadingNonFacturable={isLoadingActionNonFacturable}
        action={modalAction}
      />
      <Modal
        modalType={modalType}
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Debe escribir o subir ambas firmas
        </Alert>
      </Snackbar>
    </>
  )
}
