import { Avatar, Menu, MenuItem } from "@mui/material"
import {
  HiOutlineDotsHorizontal,
  HiPencil,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi"
import secureLocalStorage from "react-secure-storage"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ConstantCompanyMessage,
  ConstantHttpErrors,
  ConstantLocalStorage,
} from "../../../../../common/constants"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { CompanyService } from "../../../../../common/services/CompanyService"
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table"

interface TicketListTableInterface {
  data: Row[]
  handleReload: () => void
}

interface Row {
  IdCompany: string
  Name: string
  ImgUrl: string
  Ruc: number
  Address: string
  MainContactName: string
  MainContactEmail: string
}

export const CompanyListTable = ({
  data = [],
  handleReload,
}: TicketListTableInterface) => {
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
    secureLocalStorage.setItem(ConstantLocalStorage.ID_COMPANY, id)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
    setModalMessage(ConstantCompanyMessage.COMPANY_DELETE_QUESTION)
    setModalAction("eliminar")
  }

  const handleDeleteBtn = async () => {
    const { status } = await CompanyService.deleteCompany(selectedId!)
    if (status == ConstantHttpErrors.OK) {
      setIsModalOpen(false)
      setTimeout(() => {
        setModalAction(null)
        setIsModalOpen(true)
        setModalType("success")
        setModalMessage(ConstantCompanyMessage.COMPANY_DELETE)
      }, 1000)
      setTimeout(() => {
        handleReload()
      }, 2500)
    } else {
      setIsModalOpen(false)
      setTimeout(() => {
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantCompanyMessage.COMPANY_DELETE_ERROR)
      }, 1000)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedId(null)
  }

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      {
        accessorFn: (row) => row.Name,
        header: "Empresa",
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
              <div>{params.row.original.Name}</div>
            </div>
          )
        },
      },
      {
        accessorFn: (row) => row.Ruc,
        header: "RUC",
      },
      {
        accessorFn: (row) => row.Address,
        header: "Dirección fiscal",
        grow: true,
      },
      {
        accessorFn: (row) => row.MainContactName,
        header: "Contacto principal",
        size: 220,
      },
      {
        accessorFn: (row) => row.MainContactEmail,
        header: "C.E. Contacto principal",
        size: 220,
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
            handleClick(event, params.row.original.IdCompany)
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
              Ver empresa
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              <HiPencil size={"20"} className="mr-2" />
              Editar empresa
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <HiOutlineTrash size={"20"} className="mr-2" />
              Eliminar empresa
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
