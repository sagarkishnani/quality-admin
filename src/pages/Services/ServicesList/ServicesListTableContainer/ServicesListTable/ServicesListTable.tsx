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
  ConstantServiceMessage,
} from "../../../../../common/constants"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { Modal } from "../../../../../common/components/Modal/Modal"
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table"
import { ServicesService } from "../../../../../common/services/ServicesService"

interface ServicesListTableInterface {
  data: Row[]
  handleReload: () => void
}

interface Row {
  IdService: string
  Name: string
  Cost: number
  RecordCreationDate: Date
}

export const ServicesListTable = ({
  data = [],
  handleReload,
}: ServicesListTableInterface) => {
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
    secureLocalStorage.setItem(ConstantLocalStorage.ID_SERVICE, id)
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
    setModalMessage(ConstantServiceMessage.SERVICE_DELETE_QUESTION)
    setModalAction("eliminar")
  }

  const handleDeleteBtn = async () => {
    const { status }: any = await ServicesService.deleteService(selectedId)

    if (status == ConstantHttpErrors.OK) {
      setIsModalOpen(false)
      setTimeout(() => {
        setModalAction(null)
        setIsModalOpen(true)
        setModalType("success")
        setModalMessage(ConstantServiceMessage.SERVICE_DELETE_SUCCESS)
      }, 1000)
      setTimeout(() => {
        handleReload()
      }, 2500)
    } else {
      setIsModalOpen(false)
      setTimeout(() => {
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantServiceMessage.SERVICE_DELETE_ERROR)
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
        accessorFn: (row) => row.Name,
        header: "Nombre",
        grow: true,
      },
      {
        accessorFn: (row) => {
          const cost = "$" + row.Cost
          return cost
        },
        header: "Costo",
        size: 120,
      },
      {
        accessorFn: (row) => {
          const creationDate = row.RecordCreationDate
          const formattedDate = format(new Date(creationDate), "dd/MM/yyyy")
          return formattedDate
        },
        header: "Fecha de creación",
        size: 180,
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
            handleClick(event, params.row.original.IdService)
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
      size: 140,
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
      {data && data?.length == 0 && (
        <div className="flex-1">No se encontraron resultados</div>
      )}
      {data && data?.length !== 0 && (
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
              Ver servicio
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              <HiPencil size={"20"} className="mr-2" />
              Editar servicio
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <HiOutlineTrash size={"20"} className="mr-2" />
              Eliminar servicio
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
