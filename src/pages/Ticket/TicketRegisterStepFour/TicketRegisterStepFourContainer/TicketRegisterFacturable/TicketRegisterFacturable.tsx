import {
  Alert,
  Autocomplete,
  Skeleton,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material"
import moment from "moment"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantFilePurpose,
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMailConfigFacturable,
  ConstantProject,
  ConstantTicketMessage,
} from "../../../../../common/constants"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { ServicesService } from "../../../../../common/services/ServicesService"
import { TicketService } from "../../../../../common/services/TicketService"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { TicketServicesService } from "../../../../../common/services/TicketServicesService"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { HiOutlineTrash } from "react-icons/hi"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { useLocation, useNavigate } from "react-router-dom"
import TechnicalServiceReport from "../../../../../common/mailTemplates/technicalServiceReport"
import ReactDOMServer from "react-dom/server"
import html2pdf from "html2pdf.js"
import {
  Attachement,
  MailService,
  SendEmailRequest,
} from "../../../../../common/services/MailService"
import {
  generateImageTable,
  generateMailFacturableWithServices,
  generateTableHTML,
} from "../../../../../common/utils"
import { Button } from "../../../../../common/components/Button/Button"
import { RegisterNotificationRequest } from "../../../../../common/interfaces/Notification.interface"
import { NotificationService } from "../../../../../common/services/NotificationService"
import {
  ConstantTicketStatus,
  ConstantRoles,
} from "../../../../../common/constants"
import { generateMailFacturableWithServicesUserResponse } from "../../../../../common/utils"
import { ServiceModal } from "../../../../../common/components/ServiceModal/ServiceModal"
import useUserStore from "../../../../../common/stores/UserStore"
import CostServiceReport, {
  CostService,
  ServicePdfData,
} from "../../../../../common/mailTemplates/servicesCostReport"

const validationSchema = yup.object({})

export const TicketRegisterFacturable = () => {
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
  const user = useUserStore((state) => state.user)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [isLoadingActionAgree, setIsLoadingActionAgree] =
    useState<boolean>(false)
  const [isLoadingActionPurchase, setIsLoadingActionPurchase] =
    useState<boolean>(false)
  const [isLoadingActionDeny, setIsLoadingActionDeny] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [services, setServices] = useState<any[]>([])
  const [selectedService, setSelectedService] = useState<any>()
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [isView, setIsView] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isRequireOrder, setIsRequireOrder] = useState(false)
  const [total, setTotal] = useState<number>()
  // const [ticketServices, setTicketServices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [serviceModalMessage] = useState("Añadir servicio")
  const navigate = useNavigate()
  const location = useLocation()

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const newServices = selectedServices.filter(
      (service) => id !== service.IdService
    )

    setSelectedServices(newServices)
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

  const mailOptions = () => {
    const userSignature = ticket?.TicketFile.filter(
      (file) => file.FilePurpose === ConstantFilePurpose.FIRMA_USUARIO
    )[0]

    const technicianSignature = ticket?.TicketFile.filter(
      (file) => file.FilePurpose === ConstantFilePurpose.FIRMA_TECNICO
    )[0]

    const pdfData = {
      CodeTicket: ticket.CodeTicket.toString(),
      RecordCreationDate: moment(ticket?.ScheduledAppointmentDate).format(
        "DD/MM/YYYY"
      ),
      AppointmentInitTime: moment(ticket?.AppointmentInitTime).format("HH:mm"),
      AppointmentEndTime: moment(ticket?.AppointmentEndTime).format("HH:mm"),
      Company: ticket?.Company.Name,
      Address: ticket?.Local ? ticket?.Local.Address : ticket?.Company.Address,
      Local: ticket?.Local ? ticket?.Local.Name : ticket?.Company.Local,
      CompanyFloor: ticket?.CompanyFloor,
      CompanyArea: ticket?.CompanyArea,
      User: ticket?.User.Name,
      DeviceOne: ticket?.DeviceOneValue,
      SeriesNumberOne: ticket?.SeriesNumberOne,
      CounterOne: ticket?.CounterOne,
      GuideOne: ticket?.GuideOne,
      DeviceTwo: ticket?.DeviceTwoValue,
      SeriesNumberTwo: ticket?.SeriesNumberTwo,
      CounterTwo: ticket?.CounterTwo,
      GuideTwo: ticket?.GuideTwo,
      ReportedFailure: ticket?.ReportedFailure,
      FoundFailure: ticket?.FoundFailure,
      Revision: {
        BandejaUno: ticket?.TicketAnswer?.BandejaUno,
        BandejaDos: ticket?.TicketAnswer?.BandejaDos,
        BandejaSalida: ticket?.TicketAnswer?.BandejaSalida,
        BisagraEscaner: ticket?.TicketAnswer?.BisagraEscaner,
        BandejaADF: ticket?.TicketAnswer?.BandejaADF,
        CristalCamaPlana: ticket?.TicketAnswer?.CristalCamaPlana,
        ConectorUSB: ticket?.TicketAnswer?.ConectorUSB,
        ConectorRJ: ticket?.TicketAnswer?.ConectorRJ,
        PanelControl: ticket?.TicketAnswer?.PanelControl,
        Engranaje: ticket?.TicketAnswer?.Engranaje,
        LaminaTeplon: ticket?.TicketAnswer?.LaminaTeplon,
        RodilloPresion: ticket?.TicketAnswer?.RodilloPresion,
      },
      Procedure: {
        Instalacion: ticket?.TicketAnswer?.Instalacion ? "X" : "",
        Cambio: ticket?.TicketAnswer?.Cambio ? "X" : "",
        Mantenimiento: ticket?.TicketAnswer?.MantenimientoCheck ? "X" : "",
        Reparacion: ticket?.TicketAnswer?.Reparacion ? "X" : "",
        Retiro: ticket?.TicketAnswer?.Retiro ? "X" : "",
        Revision: ticket?.TicketAnswer?.Revision ? "X" : "",
        MantImpresora: ticket?.TicketAnswer?.MantImpresora ? "X" : "",
        MantOptico: ticket?.TicketAnswer?.MantOptico ? "X" : "",
        MantOpticoEscaner: ticket?.TicketAnswer?.MantOpticoEscaner ? "X" : "",
        MantSistema: ticket?.TicketAnswer?.MantSistema ? "X" : "",
        ActualFirmware: ticket?.TicketAnswer?.ActualFirmware ? "X" : "",
        EtiquetaFusor: ticket?.TicketAnswer?.EtiquetaFusor ? "X" : "",
        EtiquetaFusorTeflon: ticket?.TicketAnswer?.EtiquetaFusorTeflon
          ? "X"
          : "",
        RevCartucho: ticket?.TicketAnswer?.RevCartucho ? "X" : "",
        RevFusor: ticket?.TicketAnswer?.RevFusor ? "X" : "",
        RevImagen: ticket?.TicketAnswer?.RevImagen ? "X" : "",
        RevADF: ticket?.TicketAnswer?.RevADF ? "X" : "",
        RevRodilloBUno: ticket?.TicketAnswer?.RevRodilloBUno ? "X" : "",
        RevRodilloBDos: ticket?.TicketAnswer?.RevRodilloBDos ? "X" : "",
        RevSeparador: ticket?.TicketAnswer?.RevSeparador ? "X" : "",
        RevDuplex: ticket?.TicketAnswer?.RevDuplex ? "X" : "",
        CambioCartucho: ticket?.TicketAnswer?.CambioCartucho ? "X" : "",
        CambioFusor: ticket?.TicketAnswer?.CambioFusor ? "X" : "",
        CambioImagen: ticket?.TicketAnswer?.CambioImagen ? "X" : "",
        CambioRodillo: ticket?.TicketAnswer?.CambioRodillo ? "X" : "",
        CambioTeflon: ticket?.TicketAnswer?.CambioTeflon ? "X" : "",
        CambioRodilloBUno: ticket?.TicketAnswer?.CambioRodilloBUno ? "X" : "",
        CambioRodilloBDos: ticket?.TicketAnswer?.CambioRodilloBDos ? "X" : "",
        CambioSeparador: ticket?.TicketAnswer?.CambioSeparador ? "X" : "",
        CambioDrive: ticket?.TicketAnswer?.CambioDrive ? "X" : "",
        CambioSwing: ticket?.TicketAnswer?.CambioSwing ? "X" : "",
        CambioAOF: ticket?.TicketAnswer?.CambioAOF ? "X" : "",
        CambioDC: ticket?.TicketAnswer?.CambioDC ? "X" : "",
      },
      Comments: {
        UsoPapelHumedo: ticket?.TicketAnswer?.UsoPapelHumedo ? "X" : "",
        UsoPapelReciclado: ticket?.TicketAnswer?.UsoPapelReciclado ? "X" : "",
        UsoPapelGrapas: ticket?.TicketAnswer?.UsoPapelGrapas ? "X" : "",
        UsoEtiquetas: ticket?.TicketAnswer?.UsoEtiquetas ? "X" : "",
        ConectadoPared: ticket?.TicketAnswer?.ConectadoPared ? "X" : "",
        ConectadoSupresor: ticket?.TicketAnswer?.ConectadoSupresor ? "X" : "",
        ConectadoEstabilizador: ticket?.TicketAnswer?.ConectadoEstabilizador
          ? "X"
          : "",
        ConectadoUPS: ticket?.TicketAnswer?.ConectadoUPS ? "X" : "",
        Operativo: ticket?.TicketAnswer?.Operativo ? "X" : "",
        PegadoEtiquetaGarantia: ticket?.TicketAnswer?.PegadoEtiquetaGarantia
          ? "X"
          : "",
        EnObservacion: ticket?.TicketAnswer?.EnObservacion ? "X" : "",
        EquipoRequiereCambio: ticket?.TicketAnswer?.EquipoRequiereCambio
          ? "X"
          : "",
        EquipoRequiereMantenimiento: ticket?.TicketAnswer
          ?.EquipoRequiereMantenimiento
          ? "X"
          : "",
        CartuchoOtroProveedor: ticket?.TicketAnswer?.CartuchoOtroProveedor
          ? "X"
          : "",
        CartuchoDanado: ticket?.TicketAnswer?.CartuchoDanado ? "X" : "",
      },
      Instalacion: ticket?.TicketAnswer?.Instalacion ? "X" : "",
      ServicioGarantia: ticket?.TicketAnswer?.ServicioGarantia ? "X" : "",
      Negligencia: ticket?.TicketAnswer?.Negligencia ? "X" : "",
      Mantenimiento: ticket?.TicketAnswer?.Mantenimiento ? "X" : "",
      FacturableVisit: "X",
      Comment: ticket?.Comment,
      Recommendation: ticket?.Recommendation,
      Signature: {
        ResponsibleName: ticket?.ResponsibleName,
        ResponsibleDni: ticket?.ResponsibleDni,
        ResponsibleSignature: `${supabaseUrl}/storage/v1/object/public/media/${userSignature.FileUrl}`,
        TechnicianName: ticket?.TechnicianName,
        TechnicianSignature: `${supabaseUrl}/storage/v1/object/public/media/${technicianSignature.FileUrl}`,
      },
    }

    const servicesTableHTML = generateTableHTML(selectedServices)

    const printElement = ReactDOMServer.renderToString(
      TechnicalServiceReport({ data: pdfData })
    )
    const opt = {
      format: "a4",
      filename: `${ticket?.Company.Name} - Ticket ${ticket?.CodeTicket}.pdf`,
      margin: 1,
      html2canvas: {
        dpi: 192,
        scale: 4,
        letterRendering: true,
        useCORS: true,
      },
      devicePixelRatio: 1.5,
    }

    return {
      pdfData,
      servicesTableHTML,
      printElement,
      opt,
    }
  }

  const mailOptionsServices = () => {
    const pdfCostServices: CostService[] = selectedServices.map((service) => ({
      Code: service.Code,
      Name: service.Name,
      Price: service.Cost,
      Quantity: (1).toString(),
      TotalPrice: (service.Cost * 1).toString(),
    }))

    const subtotal = pdfCostServices.reduce(
      (acc, curr) => acc + parseFloat(curr.TotalPrice),
      0
    )

    const igv = subtotal * 0.18

    const total = subtotal + igv

    const servicePdfData: ServicePdfData = {
      CodeTicket: ticket.CodeTicket.toString(),
      Company: ticket.Company.Name,
      UserCompany: ticket.User.Name,
      ServiceDate: moment(new Date()).format("DD/MM/YYYY"),
      CostService: pdfCostServices,
      IGV: igv.toFixed(2),
      Subtotal: subtotal.toFixed(2),
      Total: total.toFixed(2),
    }

    const printElementServices = ReactDOMServer.renderToString(
      CostServiceReport({ data: servicePdfData })
    )
    const optServices = {
      format: "a4",
      filename: `${ticket.Company.Name} - Ticket ${ticket?.CodeTicket} - Proforma.pdf`,
      margin: 1,
      html2canvas: {
        dpi: 192,
        scale: 4,
        letterRendering: true,
        useCORS: true,
      },
      devicePixelRatio: 1.5,
    }

    return {
      printElementServices,
      optServices,
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false)
  }

  const handleRequiresOrder = async () => {
    setIsLoadingActionPurchase(true)
    const { status }: any = await TicketService.registerPurchaseOrder(
      ticket.IdTicket,
      formik.values.PurchaseOrder
    )

    if (status === ConstantHttpErrors.OK) {
      setIsModalOpen(true)
      setModalType("success")
      setModalMessage(ConstantTicketMessage.TICKET_PURCHASE_ORDER_SUCCESS)
      setIsLoadingActionPurchase(false)
      setTimeout(() => {
        navigate("/tickets")
      }, 2000)
      return
    } else {
      setIsLoadingActionPurchase(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantTicketMessage.TICKET_REGISTER_ERROR)
      setTimeout(() => {
        navigate("/tickets")
      }, 2000)
      return
    }
  }

  const handleConfirm = async () => {
    setIsLoadingActionAgree(true)
    const { status }: any = await TicketService.registerTicketStepFive(
      ticket.IdTicket,
      true
    )

    if (status === ConstantHttpErrors.OK) {
      html2pdf().from(mailOptions().printElement).set(mailOptions().opt).save()

      html2pdf()
        .from(mailOptions().printElement)
        .set(mailOptions().opt)
        .outputPdf()
        .then(async (pdf) => {
          const base64 = btoa(pdf)

          const attachments: Attachement = {
            filename: `${ticket?.CodeTicket}.pdf`,
            content: base64,
          }

          const companyMails: string[] = []
          companyMails?.push("soporte.tecnico@qualitysumprint.com")

          const images = await TicketService.getTicketFiles(ticket.IdTicket)

          const request: SendEmailRequest = {
            from: ConstantMailConfigFacturable.FROM,
            to: companyMails,
            subject: `${
              ticket?.Company.Name
            } - Ticket N°${ticket?.CodeTicket.toString()} - Finalización de servicio - Facturable`,
            html: generateMailFacturableWithServicesUserResponse(
              ticket?.CodeTicket.toString(),
              ticket?.User.Name,
              ticket?.Company.Name,
              mailOptions().servicesTableHTML,
              total!,
              true,
              ticket.Company.RequiresOrder,
              generateImageTable(images)
            ),
            attachments: [attachments],
          }

          const res = await MailService.sendEmail(request)

          if (res.ok) {
            const requestNotification: RegisterNotificationRequest = {
              IdTicket: ticket.IdTicket,
              CodeTicket: ticket.CodeTicket,
              IdCompany: ticket.IdTicketCompany,
              IdTechnician: ticket.IdTechnician,
              IdTicketStatus: ConstantTicketStatus.FINALIZADO,
              IdUser: ticket.IdUser,
            }

            await registerNotification(requestNotification)

            setIsModalOpen(true)
            setModalType("success")
            setModalMessage(ConstantTicketMessage.TICKET_FINISHED_SUCCESS)
            setIsLoadingActionAgree(false)
            setTimeout(() => {
              navigate("/tickets")
            }, 2000)
            return
          } else {
            setIsLoadingActionAgree(false)
            setIsModalOpen(true)
            setModalType("error")
            setModalMessage(ConstantTicketMessage.TICKET_MAIL_FINISH_ERROR)
            setTimeout(() => {
              navigate("/tickets")
            }, 2000)
            return
          }
        })
    } else {
      setIsLoadingActionAgree(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantTicketMessage.TICKET_REGISTER_ERROR)
      setTimeout(() => {
        navigate("/tickets")
      }, 2000)
      return
    }
  }

  const handleTicketOpen = async () => {
    setIsLoadingActionDeny(true)
    const { data, status }: any = await TicketService.registerTicketStepFive(
      ticket.IdTicket,
      false
    )

    if (status === ConstantHttpErrors.OK) {
      html2pdf().from(mailOptions().printElement).set(mailOptions().opt).save()

      html2pdf()
        .from(mailOptions().printElement)
        .set(mailOptions().opt)
        .outputPdf()
        .then(async (pdf) => {
          const base64 = btoa(pdf)

          const attachments: Attachement = {
            filename: `${ticket?.Company.Name} - Ticket ${ticket?.CodeTicket}.pdf`,
            content: base64,
          }

          const companyMails = ticket?.Local.Mails.split(",")
          companyMails?.push("soporte.tecnico@qualitysumprint.com")

          const images = await TicketService.getTicketFiles(ticket.IdTicket)

          const request: SendEmailRequest = {
            from: ConstantMailConfigFacturable.FROM,
            to: companyMails,
            subject: `${ticket?.Company.Name} - Ticket N°${data[0].CodeTicket} - Costo de servicio rechazado - Ticket abierto`,
            html: generateMailFacturableWithServicesUserResponse(
              ticket?.CodeTicket.toString(),
              ticket?.User.Name,
              ticket?.Company.Name,
              mailOptions().servicesTableHTML,
              total!,
              false,
              ticket.Company.RequiresOrder,
              generateImageTable(images)
            ),
            attachments: [attachments],
          }

          const res = await MailService.sendEmail(request)

          if (res.ok) {
            const requestNotification: RegisterNotificationRequest = {
              IdTicket: ticket.IdTicket,
              CodeTicket: ticket.CodeTicket,
              IdCompany: ticket.IdTicketCompany,
              IdTechnician: ticket.IdTechnician,
              IdTicketStatus: ConstantTicketStatus.ABIERTO,
              IdUser: ticket.IdUser,
            }

            await registerNotification(requestNotification)

            setIsModalOpen(true)
            setModalType("success")
            setModalMessage(ConstantTicketMessage.TICKET_OPEN_SUCCESS)
            setIsLoadingActionDeny(false)
            setTimeout(() => {
              navigate("/tickets")
            }, 2000)
            return
          } else {
            setIsLoadingActionDeny(false)
            setIsModalOpen(true)
            setModalType("error")
            setModalMessage(ConstantTicketMessage.TICKET_MAIL_FINISH_ERROR)
            setTimeout(() => {
              navigate("/tickets")
            }, 2000)
            return
          }
        })
    } else {
      setIsLoadingActionDeny(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantTicketMessage.TICKET_REGISTER_ERROR)
      setTimeout(() => {
        navigate("/tickets")
      }, 2000)
      return
    }
  }

  const handleRegister = () => {
    if (selectedServices.length === 0) return
    registerTicketStepFour()
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

  async function registerTicketStepFour() {
    setIsLoadingAction(true)

    const { status: ticketStatus }: any =
      await TicketService.registerTicketStepFour(ticket.IdTicket)

    if (ticketStatus == ConstantHttpErrors.OK) {
      await TicketServicesService.deleteTicketServices(ticket.IdTicket)

      for (const service of selectedServices) {
        const { status }: any =
          await TicketServicesService.registerTicketService(
            ticket.IdTicket,
            service.IdService,
            service.Code,
            service.Name,
            service.Cost
          )

        if (
          status !== ConstantHttpErrors.CREATED &&
          status !== ConstantHttpErrors.OK
        ) {
          setIsLoadingAction(false)
          setIsModalOpen(true)
          setModalType("error")
          setModalMessage(ConstantTicketMessage.TICKET_SERVICE_REGISTER_ERROR)
          return
        }
      }

      html2pdf().from(mailOptions().printElement).set(mailOptions().opt).save()
      html2pdf()
        .from(mailOptionsServices().printElementServices)
        .set(mailOptionsServices().optServices)
        .save()

      const [pdfGeneral, pdfServices] = await Promise.all([
        html2pdf()
          .from(mailOptions().printElement)
          .set(mailOptions().opt)
          .outputPdf(),
        html2pdf()
          .from(mailOptionsServices().printElementServices)
          .set(mailOptionsServices().optServices)
          .outputPdf(),
      ])

      const attachments: Attachement[] = [
        {
          filename: `${ticket?.CodeTicket}.pdf`,
          content: btoa(pdfGeneral),
        },
        {
          filename: `${ticket?.CodeTicket}-servicios.pdf`,
          content: btoa(pdfServices),
        },
      ]

      let companyMails: string[] = ticket?.Local?.Mails?.split(",") || []

      const extraMails1 =
        "soporte.tecnico@qualitysumprint.com, asistente.adm@qualitysumprint.com"
      const extraMails2 = ticket?.Company?.FacturableMails || ""

      // Agrega los nuevos correos desglosados
      companyMails = companyMails
        .concat(extraMails1.split(","))
        .concat(extraMails2.split(","))

      // Limpia espacios en blanco y elimina duplicados si es necesario
      companyMails = companyMails
        .map((mail) => mail.trim())
        .filter((mail) => mail !== "")

      // Opcional: eliminar duplicados
      companyMails = [...new Set(companyMails)]

      const isWaiting =
        ticket?.IdTicketStatus === ConstantTicketStatus.EN_ESPERA

      const images = await TicketService.getTicketFiles(ticket.IdTicket)

      const request: SendEmailRequest = {
        from: ConstantMailConfigFacturable.FROM,
        to: companyMails,
        subject: `${
          ticket?.Company.Name
        } - Ticket N°${ticket?.CodeTicket.toString()} - Costo de servicios - Facturable (En espera de confirmación)`,
        html: generateMailFacturableWithServices(
          ticket?.CodeTicket.toString(),
          ticket?.User.Name,
          ticket?.Company.Name,
          mailOptions().servicesTableHTML,
          total!,
          isWaiting,
          generateImageTable(images)
        ),
        attachments: attachments,
      }

      const res = await MailService.sendEmail(request)

      if (res.ok) {
        const requestNotification: RegisterNotificationRequest = {
          IdTicket: ticket.IdTicket,
          CodeTicket: ticket.CodeTicket,
          IdCompany: ticket.IdTicketCompany,
          IdTechnician: ticket.IdTechnician,
          IdTicketStatus: ConstantTicketStatus.EN_ESPERA,
          IdUser: ticket.IdUser,
        }

        await registerNotification(requestNotification)

        setIsModalOpen(true)
        setModalType("success")
        setModalMessage(ConstantTicketMessage.TICKET_WAITING_SUCCESS)
        setIsLoadingAction(false)
        setTimeout(() => {
          navigate("/tickets")
        }, 2000)
        return
      } else {
        setIsLoadingAction(false)
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantTicketMessage.TICKET_MAIL_FINISH_ERROR)
        setTimeout(() => {
          navigate("/tickets")
        }, 2000)
        return
      }
    } else {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantTicketMessage.TICKET_REGISTER_ERROR)
      setTimeout(() => {
        navigate("/tickets")
      }, 2000)
      return
    }
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
    await getServices()
    await getTicketServices(idTicket)
    setIsLoading(false)
  }

  async function getServices() {
    const data = await ServicesService.getServices()
    if (data) {
      setServices(data)
    }
  }

  const handleAddService = () => {
    const chosenService = services.find(
      ({ IdService }) => selectedService?.IdService === IdService
    )

    if (chosenService) {
      const isSelected = selectedServices.find(
        ({ IdService }) => selectedService.IdService === IdService
      )
      if (isSelected) {
        handleOpen()
        return
      }

      if (selectedServices.length == 0) {
        setSelectedServices([chosenService])
      } else {
        setSelectedServices((prevSelectedServices) => [
          ...prevSelectedServices,
          selectedService,
        ])
      }
    }
  }

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
    }
  }

  async function getTicketServices(idTicket: string) {
    const { data } = await TicketServicesService.getTicketServices(idTicket)
    if (data) {
      // const onlyServices = data.map((item) => item.Services)
      setSelectedServices(data)
    }
  }

  const formik = useFormik({
    initialValues: {
      Service: "",
      PurchaseOrder: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  })

  useEffect(() => {
    setTotal(selectedServices.reduce((acc, service) => acc + service.Cost, 0))
  }, [selectedServices])

  useEffect(() => {
    const idTicket = secureLocalStorage.getItem(ConstantLocalStorage.ID_TICKET)
    if (idTicket !== null) {
      getAll(idTicket)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (ticket) {
      formik.setValues({
        PurchaseOrder: ticket?.PurchaseOrder || "",
      })
    }
    setIsLoading(false)
  }, [ticket])

  useEffect(() => {
    // return () => {
    //   secureLocalStorage.removeItem(ConstantLocalStorage.TICKET_FACTURABLE)
    // }
    setIsView(location.pathname.includes("/ver"))
    setIsConfirm(location.pathname.includes("/confirmar-facturable"))
    setIsRequireOrder(
      location.pathname.includes("/registrar-orden") ||
        ((location.pathname.includes("/registrar-facturable") ||
          location.pathname.includes("/ver") ||
          location.pathname.includes("/confirmar-facturable")) &&
          ticket?.PurchaseOrder)
    )
  }, [ticket])

  const columns: GridColDef[] = [
    {
      field: "IdService",
      headerName: "Service ID",
      width: 10,
      disableColumnMenu: true,
    },
    {
      field: "Code",
      headerName: "Código",
      width: 300,
      disableColumnMenu: true,
    },
    {
      field: "Name",
      headerName: "Descripción del servicio",
      width: 550,
      disableColumnMenu: true,
    },
    {
      field: "Cost",
      headerName: "Precio",
      width: 100,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div>${params.value}</div>
      },
    },
    {
      field: "Action",
      headerName: "Acción",
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
          handleDeleteClick(event, params.row.IdService)
        }

        return (
          <>
            {!isView && !isConfirm && (
              <div
                className="flex w-full justify-center text-center cursor-pointer"
                onClick={handleClick}
              >
                <HiOutlineTrash color="#C94F47" size={"20"} />
              </div>
            )}
          </>
        )
      },
    },
  ]

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-semibold text-xl pb-2">
            Reporte de servicio técnico
          </h2>
        </div>
        {!isLoading ? (
          <>
            <div className="col-span-12 md:col-span-4 justify-end flex">
              <h2 className="font-semibold text-qGray pb-2">
                {moment(ticket?.RecordCreationDate).format("DD/MM/YYYY")}
              </h2>
            </div>
            <>
              <div className="col-span-12 md:col-span-8">
                {!isView && user?.IdRole === ConstantRoles.LIDER_FUNCIONAL && (
                  <Autocomplete
                    className="w-full"
                    disablePortal
                    options={services}
                    onChange={(event, newValue) => {
                      setSelectedService(newValue)
                      formik.setFieldValue("Service", newValue?.Name || "")
                    }}
                    value={selectedService ? selectedService : {}}
                    getOptionLabel={(option) =>
                      `${option?.Code || ""} ${option?.Name || ""}` || ""
                    }
                    renderInput={(params) => (
                      <TextField
                        name="Service"
                        required
                        {...params}
                        label="Servicios"
                      />
                    )}
                    openText="Mostrar opciones"
                    noOptionsText="No hay opciones"
                  />
                )}
              </div>
              {!isView && user?.IdRole === ConstantRoles.LIDER_FUNCIONAL && (
                <div className="col-span-12 justify-center md:justify-normal md:col-span-4 flex items-center">
                  <button
                    className={`px-8 py-2 font-medium rounded-md text-white ${
                      formik.isValid
                        ? "bg-qGreen hover:bg-qDarkGreen"
                        : "bg-qGray"
                    }`}
                    onClick={handleAddService}
                    type="button"
                  >
                    Añadir
                  </button>
                </div>
              )}
              <div className="col-span-12">
                <>
                  {selectedServices?.length == 0 && (
                    <div className="flex-1 p-4">
                      No se ha agregado ningún servicio
                    </div>
                  )}
                  {selectedServices?.length !== 0 && (
                    <>
                      <div className="flex-1 w-full md:w-[80vw] lg:w-auto">
                        <div style={{ height: "100%", width: "100%" }}>
                          <DataGrid
                            rows={selectedServices}
                            getRowId={(row) => row.IdService}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: { page: 0, pageSize: 8 },
                              },
                              columns: {
                                columnVisibilityModel: {
                                  IdService: false,
                                },
                              },
                            }}
                            pageSizeOptions={[8, 12, 20]}
                            localeText={{
                              noRowsLabel: "No se ha encontrado datos.",
                              noResultsOverlayLabel:
                                "No se ha encontrado ningún resultado",
                              toolbarColumns: "Columnas",
                              toolbarColumnsLabel: "Seleccionar columnas",
                              toolbarFilters: "Filtros",
                              toolbarFiltersLabel: "Ver filtros",
                              toolbarFiltersTooltipHide: "Quitar filtros",
                              toolbarFiltersTooltipShow: "Ver filtros",
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              </div>
            </>
          </>
        ) : (
          <div className="col-span-12">
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
          </div>
        )}
      </div>
      {total! > 0 && (
        <div className="mt-6">
          {" "}
          <h2>
            El costo total del servicio facturable es de{" "}
            <strong>${(Math.round(total! * 100) / 100).toFixed(2)}</strong>
          </h2>
        </div>
      )}
      {!isLoading &&
        user?.IdRole === ConstantRoles.LIDER_FUNCIONAL &&
        !isView && (
          <div className="w-full mt-12 flex justify-center lg:justify-end">
            <Tooltip title="Enviar a espera de confirmación">
              <Button
                className="px-8"
                label="Enviar para confirmación"
                color="#74C947"
                disabled={
                  !formik.isValid ||
                  selectedServices.length === 0 ||
                  isLoadingAction
                }
                isLoading={isLoadingAction}
                onClick={handleRegister}
                type="button"
              />
            </Tooltip>
          </div>
        )}
      {isRequireOrder && (
        <div className="col-span-12 mt-4">
          <TextField
            disabled={
              isView || user?.IdRole !== ConstantRoles.ASISTENTE_ADMINISTRATIVO
            }
            color="primary"
            className="w-full"
            required
            id="PurchaseOrder"
            name="PurchaseOrder"
            value={formik.values.PurchaseOrder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.PurchaseOrder &&
              Boolean(formik.errors.PurchaseOrder)
            }
            helperText={
              formik.touched.PurchaseOrder && formik.errors.PurchaseOrder
            }
            label="Orden de compra"
          />
        </div>
      )}
      {(user?.IdRole === ConstantRoles.USUARIO ||
        user?.IdRole === ConstantRoles.ASISTENTE_ADMINISTRATIVO) &&
        isRequireOrder &&
        !isView &&
        ticket?.IdTicketStatus === ConstantTicketStatus.EN_ESPERA && (
          <div className="w-full mt-12 flex justify-end">
            <Button
              className="px-8"
              label="Ingresar orden de compra"
              color="#74C947"
              disabled={
                isLoadingActionPurchase || formik.values.PurchaseOrder === ""
              }
              isLoading={isLoadingActionPurchase}
              onClick={handleRequiresOrder}
              type="button"
            />
          </div>
        )}
      {(user?.IdRole === ConstantRoles.USUARIO) &&
        ticket?.IdTicketStatus === ConstantTicketStatus.EN_ESPERA &&
        !isView && (
          <div className="w-full mt-12 flex justify-end">
            <Button
              className="px-8 mr-4"
              label="Rechazar"
              color="#C94F47"
              disabled={isLoadingActionDeny}
              isLoading={isLoadingActionDeny}
              onClick={handleTicketOpen}
              type="button"
            />
            <Button
              className="px-8"
              label="Confirmar"
              color="#74C947"
              disabled={isLoadingActionAgree}
              isLoading={isLoadingActionAgree}
              onClick={handleConfirm}
              type="button"
            />
          </div>
        )}
      <Modal
        modalType={modalType}
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
      <ServiceModal
        title={serviceModalMessage}
        open={isServiceModalOpen}
        handleClose={handleCloseServiceModal}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          No puede agregar servicios repetidos
        </Alert>
      </Snackbar>
    </>
  )
}
