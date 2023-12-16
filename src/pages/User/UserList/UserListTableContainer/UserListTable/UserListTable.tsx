import { Menu, MenuItem } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import {
  HiOutlineDotsHorizontal,
  HiPencil,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantUserMessage,
} from "../../../../../common/constants"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { useNavigate } from "react-router-dom"
import { UserService } from "../../../../../common/services/UserService"

interface UserListTableInterface {
  rows: Row[]
  handleReload: () => void
}

interface Row {
  IdUser: string
  Dni: number
  Name: string
  email: string
  PhoneNumber: string
  IdRole: string
  IdCompany: string
  RecordCreationDate: Date
  RecordEditDate: Date
}

export const UserListTable = ({
  rows,
  handleReload,
}: UserListTableInterface) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [modalAction, setModalAction] = useState<string | null>("eliminar")
  const navigate = useNavigate()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedId(id)
    secureLocalStorage.setItem(ConstantLocalStorage.ID_USER, id)
  }

  const handleView = () => {
    navigate("ver")
  }

  const handleEdit = () => {
    navigate("editar")
  }

  const handleDelete = () => {
    setIsModalOpen(true)
    setModalType("question")
    setModalMessage(ConstantUserMessage.USER_DELETE_QUESTION)
    setModalAction("eliminar")
  }

  const handleDeleteBtn = async () => {
    const { status } = await UserService.deleteUser(selectedId!)
    if (status == ConstantHttpErrors.OK) {
      setIsModalOpen(false)
      setTimeout(() => {
        setModalAction(null)
        setIsModalOpen(true)
        setModalType("success")
        setModalMessage(ConstantUserMessage.USER_DELETE)
      }, 1000)
      setTimeout(() => {
        handleReload()
      }, 2500)
    } else {
      setIsModalOpen(false)
      setTimeout(() => {
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantUserMessage.USER_DELETE_ERROR)
      }, 1000)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedId(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const columns: GridColDef[] = [
    {
      field: "Dni",
      headerName: "DNI",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "Name",
      headerName: "Nombre",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Correo",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "PhoneNumber",
      headerName: "Celular",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "Role",
      headerName: "Rol",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "Company",
      headerName: "Empresa",
      width: 180,
      disableColumnMenu: true,
    },
    // {
    //   field: "RecordCreationDate",
    //   headerName: "Fecha de creación",
    //   width: 180,
    //   disableColumnMenu: true,
    // },
    // {
    //   field: "RecordEditDate",
    //   headerName: "Fecha de edición",
    //   width: 180,
    //   disableColumnMenu: true,
    // },
    {
      field: "Detail",
      headerName: "",
      width: 80,
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleDetailClick = (event: React.MouseEvent<HTMLDivElement>) => {
          handleClick(event, params.row.IdUser)
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
        <div className="flex-1">No se encontraron resultados</div>
      )}
      {rows.length !== 0 && (
        <>
          <div className="flex-1 w-[80vw] lg:w-auto">
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                className="overflow-x-auto"
                getRowId={(row) => row.IdUser}
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
              Ver usuario
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              <HiPencil size={"20"} className="mr-2" />
              Editar usuario
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <HiOutlineTrash size={"20"} className="mr-2" />
              Eliminar usuario
            </MenuItem>
          </Menu>
          <Modal
            handleClose={handleCloseModal}
            modalType={modalType}
            title={modalMessage}
            open={isModalOpen}
            handleAction={handleDeleteBtn}
            action={modalAction}
          />
        </>
      )}
    </>
  )
}
