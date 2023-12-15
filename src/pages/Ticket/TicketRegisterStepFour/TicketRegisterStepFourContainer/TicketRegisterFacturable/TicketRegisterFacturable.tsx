import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material"
import moment from "moment"
import * as yup from "yup"
import { MasterTable } from "../../../../../common/interfaces/MasterTable.interface"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantFilePurpose,
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMailConfigFacturable,
  ConstantMessage,
  ConstantTicketMessage,
  ConstantsMasterTable,
} from "../../../../../common/constants"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { MasterTableService } from "../../../../../common/services/MasterTableService"
import { ServicesService } from "../../../../../common/services/ServicesService"
import { TicketService } from "../../../../../common/services/TicketService"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { TicketServicesService } from "../../../../../common/services/TicketServicesService"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { HiOutlineTrash } from "react-icons/hi"
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
import { generateTableHTML } from "../../../../../common/utils"

const validationSchema = yup.object({})

interface Row {
  IdTicket: number
  CodeTicket: number
  Company: string
  Status: string
  Type: string
  Technician: string
  RecordCreationDate: Date
  AppointmentDate: Date
}

export const TicketRegisterFacturable = () => {
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [services, setServices] = useState<any[]>([])
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [total, setTotal] = useState<number>()
  const [ticketServices, setTicketServices] = useState([])
  const [serviceStatus, setServiceStatus] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
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

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleRegister = () => {
    registerTicketStepFour()
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
      debugger

      const userSignature = ticket?.TicketFile.filter(
        (file) => file.FilePurpose === ConstantFilePurpose.FIRMA_USUARIO
      )[0]

      const technicianSignature = ticket?.TicketFile.filter(
        (file) => file.FilePurpose === ConstantFilePurpose.FIRMA_TECNICO
      )[0]

      const pdfData = {
        RecordCreationDate: moment(ticket?.RecordCreationDate).format(
          "DD/MM/YYYY"
        ),
        AppointmentInitTime: moment(ticket?.AppointmentInitTime).format(
          "HH:MM"
        ),
        AppointmentEndTime: moment(ticket?.AppointmentEndTime).format("HH:MM"),
        Company: ticket?.Company.Name,
        Address: ticket?.Company.Address,
        Local: ticket?.Company.Local,
        CompanyFloor: ticket?.CompanyFloor,
        CompanyArea: ticket?.CompanyArea,
        User: ticket?.User.Name,
        DeviceOne: ticket?.DeviceOne,
        SeriesNumberOne: ticket?.SeriesNumberOne,
        CounterOne: ticket?.CounterOne,
        GuideOne: ticket?.GuideOne,
        DeviceTwo: ticket?.DeviceTwo,
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
          Mantenimiento: ticket?.TicketAnswer?.Mantenimiento ? "X" : "",
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
          TechnicianName: ticket?.TechncianName,
          TechnicianSignature: `${supabaseUrl}/storage/v1/object/public/media/${technicianSignature.FileUrl}`,
        },
      }

      const servicesTableHTML = generateTableHTML(selectedServices)

      const html = `<p>Se dio por finalizado el ticket. Se adjunta el documento PDF para ver un mayor detalle como también el detalle de costos del servicio.</p> </br></br> ${servicesTableHTML} </br></br></br> <strong>El costo total del servicio es: $${total}</strong></br></br></br> <p>Para realizar acciones, ingresar al siguiente enlace <a href="https://qa.qualitysumprint.com" target="_blank">Haz click aquí</a></p> </br></br></br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-footer.jpg?t=2023-12-15T16%3A01%3A39.800Z" alt="">`

      const printElement = ReactDOMServer.renderToString(
        TechnicalServiceReport({ data: pdfData })
      )
      const opt = {
        format: "a4",
        filename: `${ticket?.CodeTicket} - Reporte de Servicio Técnico.pdf`,
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
            filename: `${ticket?.CodeTicket} - Reporte de Servicio Técnico.pdf`,
            content: base64,
          }

          const request: SendEmailRequest = {
            from: ConstantMailConfigFacturable.FROM,
            to: [ticket?.User.email, "sagarkishnani67@gmail.com"],
            subject: ConstantMailConfigFacturable.SUBJECT,
            html: html,
            attachments: [attachments],
          }
          await MailService.sendEmail(request)
        })

      setIsModalOpen(true)
      setModalType("success")
      setModalMessage(ConstantTicketMessage.TICKET_FINISHED_SUCCESS)
      setIsLoadingAction(false)
      setTimeout(() => {
        navigate("/tickets")
      }, 2000)
    } else {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantMessage.SERVICE_ERROR)
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
    const selectedService = services.find(
      ({ IdService }) => formik.values.Service === IdService
    )

    if (selectedService) {
      const isSelected = selectedServices.find(
        ({ IdService }) => selectedService.IdService === IdService
      )
      if (isSelected) {
        handleOpen()
        return
      }

      if (selectedServices.length == 0) {
        setSelectedServices([selectedService])
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
        <div className="col-span-12 md:col-span-4 justify-end flex">
          <h2 className="font-semibold text-qGray pb-2">
            {moment(ticket?.RecordCreationDate).format("DD/MM/YYYY")}
          </h2>
        </div>
        {ticketServices?.length == 0 && (
          <>
            <div className="col-span-12 md:col-span-8">
              <FormControl fullWidth>
                <InputLabel id="ServiceLabel">Servicios</InputLabel>
                <Select
                  labelId="ServiceLabel"
                  id="Service"
                  name="Service"
                  value={formik.values.Service}
                  onChange={formik.handleChange}
                >
                  {services?.map((service: any) => (
                    <MenuItem key={service.IdService} value={service.IdService}>
                      {service.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-12 justify-center md:justify-normal md:col-span-4 flex items-center">
              <button
                className={`px-8 py-2 font-medium rounded-md text-white ${
                  formik.isValid ? "bg-qGreen hover:bg-qDarkGreen" : "bg-qGray"
                }`}
                onClick={handleAddService}
              >
                Añadir
              </button>
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
      {ticketServices.length === 0 && (
        <div className="w-full mt-12 flex justify-end">
          <button
            className={`px-10 py-2 font-medium rounded-full text-white ${
              formik.isValid && selectedServices.length > 0
                ? "bg-qGreen hover:bg-qDarkGreen"
                : "bg-qGray"
            }`}
            onClick={handleRegister}
          >
            Finalizar
          </button>
        </div>
      )}

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
          No puede agregar servicios repetidos
        </Alert>
      </Snackbar>
    </>
  )
}
