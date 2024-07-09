import { Menu, MenuItem } from "@mui/material"
import { useMemo, useState } from "react"
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
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table"

interface UserListTableInterface {
  data: Row[]
  handleReload: () => void
}

interface Row {
  IdUser: string
  Dni: number
  Name: string
  email: string
  PhoneNumber: string
  IdRole: string
  Role: string
  IdCompany: string
  Company: string
  RecordCreationDate: Date
  RecordEditDate: Date
}

export const UserListTable = ({
  data = [],
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

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      {
        accessorFn: (row) => row.Dni,
        header: "DNI",
      },
      {
        accessorFn: (row) => row.Name,
        header: "Nombre",
      },
      {
        accessorFn: (row) => row.email,
        header: "Correo",
        grow: true,
      },
      {
        accessorFn: (row) => row.PhoneNumber,
        header: "Celular",
      },
      {
        accessorFn: (row) => row.Role,
        header: "Rol",
      },
      {
        accessorFn: (row) => row.Company,
        header: "Empresa",
        grow: true,
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
            handleClick(event, params.row.original.IdUser)
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

  return (
    <>
      {data?.length == 0 && (
        <div className="flex-1">No se encontraron resultados</div>
      )}
      {data?.length !== 0 && (
        <>
          <div className="flex-1 m-auto w-[80vw] xl:m-0 xl:w-auto">
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
