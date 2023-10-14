import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Badge } from "../../../../../common/components/Badge/Badge"
import moment from "moment"
import { useState, useEffect } from "react"
import {
  HiBan,
  HiOutlineDocumentText,
  HiOutlineDotsHorizontal,
  HiOutlineEye,
  HiOutlineUser,
} from "react-icons/hi"
import { Menu, MenuItem, Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMasterTableMessage,
  ConstantRoles,
  ConstantTicketMessage,
  ConstantTicketStatus,
} from "../../../../../common/constants"
import secureLocalStorage from "react-secure-storage"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { TicketService } from "../../../../../common/services/TicketService"

interface TicketListTableInterface {
  rows: Row[]
  handleReload: () => void
}

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

export const TicketListTable = ({
  rows,
  handleReload,
}: TicketListTableInterface) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [modalAction, setModalAction] = useState<string | null>("cancelar")
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedTicket(row)
    secureLocalStorage.setItem(ConstantLocalStorage.ID_TICKET, row.id)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedTicket(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleView = () => {
    navigate("ver")
  }

  const handleAssignTechnician = () => {
    navigate("asignar-tecnico")
  }

  const handleCompleteForm = () => {
    navigate("completar-formulario")
  }

  const handleCancelTicket = () => {
    setIsModalOpen(true)
    setModalType("question")
    setModalMessage(ConstantTicketMessage.TICKET_CANCEL_QUESTION)
    setModalAction("cancelar")
  }

  const handleCancelBtn = async () => {
    const { status }: any = await TicketService.cancelTicket(selectedTicket.id)

    if (status == ConstantHttpErrors.OK) {
      setIsModalOpen(false)
      setTimeout(() => {
        setModalAction(null)
        setIsModalOpen(true)
        setModalType("success")
        setModalMessage(ConstantTicketMessage.TICKET_CANCEL_SUCCESS)
      }, 1000)
      setTimeout(() => {
        handleReload()
      }, 2500)
    } else {
      setIsModalOpen(false)
      setTimeout(() => {
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantTicketMessage.TICKET_CANCEL_ERROR)
      }, 1000)
    }
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Ticket ID",
      width: 10,
      disableColumnMenu: true,
    },
    {
      field: "CodeTicket",
      headerName: "ID",
      width: 50,
      disableColumnMenu: true,
    },
    {
      field: "Company",
      headerName: "Empresa",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={params.row.ImgUrl}
              alt={params.row.Company}
              sx={{ marginRight: 2 }}
            />
            <div>{params.value}</div>
          </div>
        )
      },
    },
    {
      field: "Status",
      headerName: "Estado",
      width: 130,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <Badge status={params.value} label={params.value} />
      },
    },
    {
      field: "Type",
      headerName: "Tipo",
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <p className={`${params.value == "NO DEFINIDO" ? "text-qGray" : ""}`}>
            {params.value}
          </p>
        )
      },
    },
    {
      field: "Technician",
      headerName: "Técnico",
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <p className={`${params.value == "NO ASIGNADO" ? "text-qGray" : ""}`}>
            {params.value}
          </p>
        )
      },
    },
    {
      field: "RecordCreationDate",
      headerName: "Fecha de registro",
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (params.value) {
          return <p>{moment(params.value).format("DD/MM/YYYY")}</p>
        } else {
          return ""
        }
      },
    },
    {
      field: "AppointmentDate",
      headerName: "Fecha de atención",
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (params.value) {
          return <p>{moment(params.value).format("DD/MM/YYYY")}</p>
        } else {
          return ""
        }
      },
    },
    {
      field: "Detail",
      headerName: "",
      width: 80,
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleDetailClick = (event: React.MouseEvent<HTMLDivElement>) => {
          handleClick(event, params.row)
        }

        return (
          <>
            <div
              className="flex w-full justify-center text-center cursor-pointer"
              onClick={handleDetailClick}
            >
              <HiOutlineDotsHorizontal color="black" size={"30"} />
            </div>
          </>
        )
      },
    },
  ]

  return (
    <>
      {rows.length == 0 && (
        <div className="flex-1 p-4">No se encontraron resultados</div>
      )}
      {rows.length !== 0 && (
        <>
          <div className="flex-1 w-[80vw] lg:w-auto">
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={rows}
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
                  noResultsOverlayLabel: "No se ha encontrado ningún resultado",
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
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleView}>
              <HiOutlineEye size={"20"} className="mr-2" />
              Ver ticket
            </MenuItem>
            {(user?.IdRole === ConstantRoles.LIDER_FUNCIONAL ||
              user?.IdRole === ConstantRoles.ADMINISTRADOR_TI) &&
              selectedTicket?.Status === "Pendiente" && (
                <MenuItem onClick={handleAssignTechnician}>
                  <HiOutlineUser size={"20"} className="mr-2" />
                  Asignar técnico
                </MenuItem>
              )}
            {user?.IdRole === ConstantRoles.TECNICO &&
              selectedTicket?.Status === "En progreso" && (
                <MenuItem onClick={handleCompleteForm}>
                  <HiOutlineDocumentText size={"20"} className="mr-2" />
                  Completar formulario
                </MenuItem>
              )}
            {(user?.IdRole === ConstantRoles.LIDER_FUNCIONAL ||
              user?.IdRole === ConstantRoles.ADMINISTRADOR_TI) && (
              <MenuItem onClick={handleCancelTicket}>
                <HiBan size={"20"} className="mr-2" />
                Cancelar ticket
              </MenuItem>
            )}
          </Menu>
          <Modal
            handleClose={handleCloseModal}
            modalType={modalType}
            title={modalMessage}
            open={isModalOpen}
            handleAction={handleCancelBtn}
            action={modalAction}
          />
        </>
      )}
    </>
  )
}
