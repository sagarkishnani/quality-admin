import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Badge } from "../../../../../common/components/Badge/Badge"
import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import {
  HiBan,
  HiOutlineClipboardCheck,
  HiOutlineDocumentText,
  HiOutlineDotsHorizontal,
  HiOutlineEye,
  HiOutlineUser,
} from "react-icons/hi"
import { Menu, MenuItem, Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantRoles,
  ConstantTicketMessage,
} from "../../../../../common/constants"
import secureLocalStorage from "react-secure-storage"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { TicketService } from "../../../../../common/services/TicketService"
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table"
import useUserStore from "../../../../../common/stores/UserStore"

interface TicketListTableInterface {
  data: Row[]
  handleReload: () => void
}

interface Row {
  id: number
  CodeTicket: number
  Company: string
  Status: string
  Type: string
  Technician: string
  RecordCreationDate: Date
  AppointmentDate: Date
}

export const TicketListTable = ({
  data = [],
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
  const user = useUserStore((state) => state.user)

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

  const handleFacturableForm = () => {
    secureLocalStorage.setItem(ConstantLocalStorage.TICKET_FACTURABLE, true)
    navigate("registrar-facturable")
  }

  const handleConfirmForm = () => {
    // secureLocalStorage.setItem(ConstantLocalStorage.TICKET_FACTURABLE, true)
    navigate("confirmar-facturable")
  }

  const handleCancelTicket = () => {
    setIsModalOpen(true)
    setModalType("question")
    setModalMessage(ConstantTicketMessage.TICKET_CANCEL_QUESTION)
    setModalAction("cancelar")
  }

  const getCompletarFormulario = (selectedTicket: any) => {
    if (
      user?.IdRole === ConstantRoles.TECNICO &&
      selectedTicket?.Status === "En progreso"
    ) {
      return true
    } else if (
      (user?.IdRole === ConstantRoles.LIDER_FUNCIONAL ||
        user?.IdRole === ConstantRoles.ADMINISTRADOR_TI) &&
      selectedTicket?.IsGuaranteeTechnician &&
      selectedTicket?.Status === "En progreso" &&
      selectedTicket?.Technician === "Técnico de garantía"
    ) {
      return true
    } else false
  }

  const getConfirmarTicket = (selectedTicket: any) => {
    if (
      user?.IdRole === ConstantRoles.USUARIO &&
      selectedTicket?.Status === "En espera" &&
      user.Position === "00507"
    )
      return true
    return false
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

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      {
        accessorFn: (row) => row.CodeTicket,
        header: "ID",
        enableHiding: false,
        size: 80,
      },
      {
        accessorFn: (row) => row.Company,
        header: "Empresa",
        enableHiding: false,
        size: 260,
        grow: true,
        Cell: (params) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={params.row.original.ImgUrl}
                alt={params.row.original.Name}
                sx={{ marginRight: 2 }}
              />
              <div>{params.row.original.Company}</div>
            </div>
          )
        },
      },
      {
        accessorFn: (row) => row.Status,
        header: "Estado",
        enableHiding: false,
        size: 130,
        Cell: (params) => {
          return (
            <Badge
              status={params.row.original.Status}
              label={params.row.original.Status}
            />
          )
        },
      },
      {
        accessorFn: (row) => row.Type,
        header: "Tipo",
        size: 120,
        Cell: (params) => {
          return (
            <p
              className={`${
                params.row.original.Type == "NO DEFINIDO" ? "text-qGray" : ""
              }`}
            >
              {params.row.original.Type}
            </p>
          )
        },
      },
      {
        accessorFn: (row) => row.Technician,
        header: "Técnico",
        size: 120,
        Cell: (params) => {
          return (
            <p
              className={`${
                params.row.original.Technician == "NO DEFINIDO"
                  ? "text-qGray"
                  : ""
              }`}
            >
              {params.row.original.Technician}
            </p>
          )
        },
      },
      {
        accessorFn: (row) => row.RecordCreationDate,
        header: "Fecha de registro",
        size: 120,
        Cell: (params) => {
          if (params.row.original.RecordCreationDate) {
            return (
              <p>
                {moment(params.row.original.RecordCreationDate).format(
                  "DD/MM/YYYY"
                )}
              </p>
            )
          } else {
            return ""
          }
        },
      },
      {
        accessorFn: (row) => row.AppointmentDate,
        header: "Fecha de atención",
        size: 120,
        Cell: (params) => {
          if (params.row.original.AppointmentDate) {
            return (
              <p>
                {moment(params.row.original.AppointmentDate).format(
                  "DD/MM/YYYY"
                )}
              </p>
            )
          } else {
            return ""
          }
        },
      },
      {
        accessorKey: "Detail",
        header: "",
        size: 80,
        enableResizing: false,

        Cell: (params) => {
          const handleDetailClick = (
            event: React.MouseEvent<HTMLDivElement>
          ) => {
            handleClick(event, params.row.original)
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
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data,
    defaultColumn: {
      minSize: 80,
      size: 180,
    },
    initialState: {
      pagination: { pageSize: 20, pageIndex: 0 },
      density: "compact",
    },
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    enableColumnActions: false,
    enableColumnFilters: false,
  })

  useEffect(() => {
    const updateColumnVisibility = () => {
      const isWideScreen = window.innerWidth > 1669
      table.setColumnVisibility({ "Fecha de atención": isWideScreen })
    }

    updateColumnVisibility()

    window.addEventListener("resize", updateColumnVisibility)

    return () => {
      window.removeEventListener("resize", updateColumnVisibility)
    }
  }, [table])

  return (
    <>
      {data?.length == 0 && (
        <div className="flex-1 p-4">No se encontraron resultados</div>
      )}
      {data?.length !== 0 && (
        <>
          <div className="flex-1 m-auto w-[80vw] xl:m-0 xl:w-auto pb-6 pb:mb-0">
            <div style={{ height: "100%", width: "100%" }}>
              <MaterialReactTable table={table} />
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
            {getCompletarFormulario(selectedTicket) && (
              <MenuItem onClick={handleCompleteForm}>
                <HiOutlineDocumentText size={"20"} className="mr-2" />
                Completar formulario
              </MenuItem>
            )}
            {user?.IdRole === ConstantRoles.LIDER_FUNCIONAL &&
              (selectedTicket?.Status === "Atendido" ||
                selectedTicket?.Status === "Abierto" ||
                selectedTicket?.Status === "En espera") && (
                <MenuItem onClick={handleFacturableForm}>
                  <HiOutlineClipboardCheck size={"20"} className="mr-2" />
                  Revisar formulario
                </MenuItem>
              )}
            {(user?.IdRole === ConstantRoles.LIDER_FUNCIONAL ||
              user?.IdRole === ConstantRoles.ADMINISTRADOR_TI) &&
              selectedTicket?.Status !== "Finalizado" &&
              selectedTicket?.Status !== "Cancelado" && (
                <MenuItem onClick={handleCancelTicket}>
                  <HiBan size={"20"} className="mr-2" />
                  Cancelar ticket
                </MenuItem>
              )}
            {getConfirmarTicket(selectedTicket) && (
              <MenuItem onClick={handleConfirmForm}>
                <HiOutlineClipboardCheck size={"20"} className="mr-2" />
                Confirmar ticket
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
