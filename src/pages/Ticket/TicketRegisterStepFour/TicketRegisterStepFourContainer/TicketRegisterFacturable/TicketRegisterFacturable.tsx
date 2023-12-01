import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import moment from "moment"
import * as yup from "yup"
import { MasterTable } from "../../../../../common/interfaces/MasterTable.interface"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
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
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { HiOutlineTrash } from "react-icons/hi"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { useNavigate } from "react-router-dom"

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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [services, setServices] = useState<any[]>([])
  const [selectedServices, setSelectedServices] = useState<any[]>([])
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

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleRegister = () => {
    registerTicketStepFour()
  }

  async function registerTicketStepFour() {
    setIsLoadingAction(true)

    const { status }: any = await TicketService.registerTicketStepFour(
      ticket.IdTicket
    )

    if (status == ConstantHttpErrors.OK) {
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

  const formik = useFormik({
    initialValues: {
      Service: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  })

  //   useEffect(() => {
  //     const totalCost = selectedServices.reduce(
  //       (acc, service) => acc + service.cost,
  //       0
  //     )

  //     const totalRow = {
  //       IdService: "1",
  //       Name: "Total",
  //       Cost: totalCost,
  //     }

  //     setSelectedServices((prevSelectedServices) => [
  //       ...prevSelectedServices,
  //       totalRow,
  //     ])
  //   }, [selectedServices])

  useEffect(() => {
    const idTicket = secureLocalStorage.getItem(ConstantLocalStorage.ID_TICKET)
    if (idTicket !== null) {
      getAll(idTicket)
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
        <div className="col-span-8">
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
        <div className="col-span-4 flex items-center">
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
                <div className="flex-1 w-[80vw] lg:w-auto">
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
                            id: false,
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
      </div>
      <div className="w-full mt-12 flex justify-end">
        <button
          className={`px-10 py-2 font-medium rounded-full text-white ${
            formik.isValid ? "bg-qGreen hover:bg-qDarkGreen" : "bg-qGray"
          }`}
          onClick={handleRegister}
        >
          Finalizar
        </button>
      </div>
      <Modal
        modalType={modalType}
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
    </>
  )
}
