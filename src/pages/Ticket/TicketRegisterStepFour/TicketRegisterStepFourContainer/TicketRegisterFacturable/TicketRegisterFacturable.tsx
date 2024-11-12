import {
  Alert,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  ConstantMessage,
  ConstantRoles,
  ConstantTicketMessage,
} from "../../../../../common/constants"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { ServicesService } from "../../../../../common/services/ServicesService"
import { TicketService } from "../../../../../common/services/TicketService"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { TicketServicesService } from "../../../../../common/services/TicketServicesService"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import {
  HiDocumentAdd,
  HiOutlineDocumentAdd,
  HiOutlineTrash,
} from "react-icons/hi"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { useNavigate } from "react-router-dom"
import TechnicalServiceReport from "../../../../../common/mailTemplates/technicalServiceReport"
import ReactDOMServer from "react-dom/server"
import html2pdf from "html2pdf.js"
import {
  Attachement,
  MailService,
  SendEmailRequest,
} from "../../../../../common/services/MailService"
import {
  generateMailFacturableWithServices,
  generateTableHTML,
  procesarCadena,
} from "../../../../../common/utils"
import { Button } from "../../../../../common/components/Button/Button"
import { RegisterNotificationRequest } from "../../../../../common/interfaces/Notification.interface"
import { NotificationService } from "../../../../../common/services/NotificationService"
import { ConstantTicketStatus } from "../../../../../common/constants"
import { generateMailFacturableWithServicesUserResponse } from "../../../../../common/utils"
import { ServiceModal } from "../../../../../common/components/ServiceModal/ServiceModal"
import useUserStore from "../../../../../common/stores/UserStore"

const validationSchema = yup.object({})

export const TicketRegisterFacturable = () => {
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
  const user = useUserStore((state) => state.user)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [isLoadingActionAgree, setIsLoadingActionAgree] =
    useState<boolean>(false)
  const [isLoadingActionDeny, setIsLoadingActionDeny] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [services, setServices] = useState<any[]>([])
  const [selectedService, setSelectedService] = useState<any>()
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [total, setTotal] = useState<number>()
  const [ticketServices, setTicketServices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [serviceModalMessage, setServiceModalMessage] =
    useState("Añadir servicio")
  const navigate = useNavigate()

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
      RecordCreationDate: moment(ticket?.AppointmentInitTime).format(
        "DD/MM/YYYY"
      ),
      AppointmentInitTime: moment(ticket?.AppointmentInitTime).format("HH:mm"),
      AppointmentEndTime: moment(ticket?.AppointmentEndTime).format("HH:mm"),
      Company: ticket?.Company.Name,
      Address: ticket?.Company.Address,
      Local: ticket?.Company.Local,
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

    const servicesTableHTML = generateTableHTML(
      selectedServices.length === 0 ? ticketServices : selectedServices
    )

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

    return { pdfData, servicesTableHTML, printElement, opt }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenServiceModal = () => {
    setIsServiceModalOpen(true)
  }

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false)
  }

  const handleConfirm = async () => {
    setIsLoadingActionAgree(true)
    const { data, status }: any = await TicketService.registerTicketStepFive(
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

          const companyMails = ticket?.Local.Mails.split(",")
          companyMails?.push("soporte.tecnico@qualitysumprint.com")

          const request: SendEmailRequest = {
            from: ConstantMailConfigFacturable.FROM,
            to: companyMails,
            subject: "Finalización de servicio - Facturable",
            html: generateMailFacturableWithServicesUserResponse(
              ticket?.User.Name,
              ticket?.Company.Name,
              mailOptions().servicesTableHTML,
              total!,
              true,
              ticket.Company.RequiresOrder
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
            filename: `${ticket?.CodeTicket}.pdf`,
            content: base64,
          }

          const companyMails = ticket?.Local.Mails.split(",")
          companyMails?.push("soporte.tecnico@qualitysumprint.com")

          const request: SendEmailRequest = {
            from: ConstantMailConfigFacturable.FROM,
            to: companyMails,
            subject: "Costo de servicio rechazado - Ticket abierto",
            html: generateMailFacturableWithServicesUserResponse(
              ticket?.User.Name,
              ticket?.Company.Name,
              mailOptions().servicesTableHTML,
              total!,
              false,
              ticket.Company.RequiresOrder
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
      for (const service of selectedServices) {
        const { status }: any =
          await TicketServicesService.registerTicketService(
            ticket.IdTicket,
            service.IdService
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
        .from(mailOptions().printElement)
        .set(mailOptions().opt)
        .outputPdf()
        .then(async (pdf) => {
          const base64 = btoa(pdf)

          const attachments: Attachement = {
            filename: `${ticket?.CodeTicket}.pdf`,
            content: base64,
          }

          const companyMails = ticket?.Local.Mails.split(",")
          companyMails?.push("soporte.tecnico@qualitysumprint.com")

          const request: SendEmailRequest = {
            from: ConstantMailConfigFacturable.FROM,
            to: companyMails,
            subject:
              "Costo de servicios - Facturable (En espera de confirmación)",
            html: generateMailFacturableWithServices(
              ticket?.User.Name,
              ticket?.Company.Name,
              mailOptions().servicesTableHTML,
              total!
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
        })
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
      const onlyServices = data.map((item) => item.Services)
      setTicketServices(onlyServices)
    }
  }

  const formik = useFormik({
    initialValues: {
      Service: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  })

  useEffect(() => {
    setTotal(selectedServices.reduce((acc, service) => acc + service.Cost, 0))
  }, [selectedServices])

  useEffect(() => {
    setTotal(ticketServices.reduce((acc, service) => acc + service.Cost, 0))
  }, [ticketServices])

  useEffect(() => {
    const idTicket = secureLocalStorage.getItem(ConstantLocalStorage.ID_TICKET)
    if (idTicket !== null) {
      getAll(idTicket)
    }
  }, [])

  useEffect(() => {
    return () => {
      secureLocalStorage.removeItem(ConstantLocalStorage.TICKET_FACTURABLE)
    }
  }, [])

  const columns: GridColDef[] = [
    {
      field: "IdService",
      headerName: "Service ID",
      width: 10,
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
      headerName: "Precio + IGV",
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
            <div
              className="flex w-full justify-center text-center cursor-pointer"
              onClick={handleClick}
            >
              <HiOutlineTrash color="#C94F47" size={"20"} />
            </div>
          </>
        )
      },
    },
  ]

  const columnsView: GridColDef[] = [
    {
      field: "IdService",
      headerName: "Service ID",
      width: 10,
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
      headerName: "Precio + IGV",
      width: 100,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div>${params.value}</div>
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
            {ticketServices?.length == 0 && (
              <>
                <div className="col-span-12 md:col-span-8">
                  {/* <FormControl fullWidth>
                    <InputLabel id="ServiceLabel">Servicios</InputLabel>
                    <Select
                      labelId="ServiceLabel"
                      id="Service"
                      name="Service"
                      value={formik.values.Service}
                      onChange={formik.handleChange}
                    >
                      {services?.map((service: any) => (
                        <MenuItem
                          key={service.IdService}
                          value={service.IdService}
                        >
                          {service.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <Autocomplete
                    className="w-full"
                    disablePortal
                    options={services}
                    onChange={(event, newValue) => {
                      setSelectedService(newValue)
                      formik.setFieldValue("Service", newValue?.Name || "")
                    }}
                    value={selectedService ? selectedService : {}}
                    getOptionLabel={(option) => option?.Name || ""}
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
                </div>
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
                  <Tooltip title="Añadir nuevo servicio">
                    <button onClick={handleOpenServiceModal}>
                      <HiDocumentAdd
                        className="ml-4 align-middle"
                        size={32}
                        color="#00A0DF"
                      />
                    </button>
                  </Tooltip>
                </div>
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
            )}
            {ticketServices.length > 0 && (
              <div className="col-span-12">
                <>
                  {ticketServices?.length == 0 && (
                    <div className="flex-1 p-4">
                      No se ha agregado ningún servicio
                    </div>
                  )}
                  {ticketServices?.length !== 0 && (
                    <>
                      <div className="flex-1 w-[80vw] lg:w-auto">
                        <div style={{ height: "100%", width: "100%" }}>
                          <DataGrid
                            rows={ticketServices}
                            getRowId={(row) => row.IdService}
                            columns={columnsView}
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
            )}
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
        ticketServices.length === 0 &&
        user?.IdRole === ConstantRoles.LIDER_FUNCIONAL && (
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
      {user?.IdRole === ConstantRoles.USUARIO &&
        ticket?.IdTicketStatus === ConstantTicketStatus.EN_ESPERA && (
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
