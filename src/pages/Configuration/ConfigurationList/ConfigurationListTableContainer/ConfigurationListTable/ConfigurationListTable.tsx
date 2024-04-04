import { Menu, MenuItem } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useMemo, useState } from "react"
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
  ConstantMasterTableMessage,
} from "../../../../../common/constants"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { Modal } from "../../../../../common/components/Modal/Modal"
import { MasterTableService } from "../../../../../common/services/MasterTableService"
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table"

interface ConfigurationListTableInterface {
  data: Row[]
  handleReload: () => void
}

interface Row {
  IdMasterTable: string
  IdMasterTableParent: string
  Name: string
  Value: string
  Order: string
  RecordCreationDate: Date
}

export const ConfigurationListTable = ({
  data = [],
  handleReload,
}: ConfigurationListTableInterface) => {
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
    secureLocalStorage.setItem(ConstantLocalStorage.ID_MASTER_TABLE, id)
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
    setModalMessage(ConstantMasterTableMessage.MT_DELETE_QUESTION)
    setModalAction("eliminar")
  }

  const handleDeleteBtn = async () => {
    const { status }: any = await MasterTableService.deleteMasterTable(
      selectedId
    )

    if (status == ConstantHttpErrors.NO_CONTENT) {
      setIsModalOpen(false)
      setTimeout(() => {
        setModalAction(null)
        setIsModalOpen(true)
        setModalType("success")
        setModalMessage(ConstantMasterTableMessage.MT_DELETE_SUCCESS)
      }, 1000)
      setTimeout(() => {
        handleReload()
      }, 2500)
    } else {
      setIsModalOpen(false)
      setTimeout(() => {
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantMasterTableMessage.MT_DELETE_ERROR)
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
        accessorFn: (row) => row.IdMasterTable,
        header: "Id",
      },
      {
        accessorFn: (row) => row.IdMasterTableParent,
        header: "Id Padre",
      },
      {
        accessorFn: (row) => row.Name,
        header: "Nombre",
        grow: true,
      },
      {
        accessorFn: (row) => row.Value,
        header: "Valor",
        size: 120,
      },
      {
        accessorFn: (row) => row.Order,
        header: "Orden",
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
            handleClick(event, params.row.original.IdMasterTable)
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

  // const columns: GridColDef[] = [
  //   {
  //     field: "IdMasterTable",
  //     headerName: "Id",
  //     width: 100,
  //     disableColumnMenu: true,
  //   },
  //   {
  //     field: "IdMasterTableParent",
  //     headerName: "Id Padre",
  //     width: 100,
  //     disableColumnMenu: true,
  //   },
  //   {
  //     field: "Name",
  //     headerName: "Nombre",
  //     width: 330,
  //     disableColumnMenu: true,
  //   },
  //   {
  //     field: "Value",
  //     headerName: "Valor",
  //     width: 160,
  //     disableColumnMenu: true,
  //   },
  //   {
  //     field: "Order",
  //     headerName: "Orden",
  //     width: 90,
  //     disableColumnMenu: true,
  //   },
  //   {
  //     field: "RecordCreationDate",
  //     headerName: "Fecha de creación",
  //     width: 150,
  //     disableColumnMenu: true,
  //     valueFormatter: (params) => {
  //       const formattedDate = format(new Date(params.value), "dd/MM/yyyy")
  //       return formattedDate
  //     },
  //   },
  //   {
  //     field: "RecordEditDate",
  //     headerName: "Fecha de edición",
  //     width: 150,
  //     disableColumnMenu: true,
  //     valueFormatter: (params) => {
  //       const formattedDate = format(new Date(params.value), "dd/MM/yyyy")
  //       if (params.value == null) {
  //         return ""
  //       } else return formattedDate
  //     },
  //   },
  //   {
  //     field: "Detail",
  //     headerName: "",
  //     width: 80,
  //     disableColumnMenu: true,
  //     renderCell: (params) => {
  //       const handleDetailClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //         handleClick(event, params.row.IdMasterTable)
  //       }

  //       return (
  //         <>
  //           <div
  //             className="flex w-full justify-center text-center cursor-pointer"
  //             onClick={handleDetailClick}
  //           >
  //             <HiOutlineDotsHorizontal color="black" size={"30"} />
  //           </div>
  //         </>
  //       )
  //     },
  //   },
  // ]

  const table = useMaterialReactTable({
    columns,
    data,
    defaultColumn: {
      minSize: 80,
      size: 140,
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
              {/* <DataGrid
                className="overflow-x-auto"
                getRowId={(row) => row.IdMasterTable}
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 20 },
                  },
                  columns: {
                    columnVisibilityModel: {
                      id: false,
                    },
                  },
                }}
                pageSizeOptions={[6, 12, 20]}
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
              /> */}
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
              Ver item
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              <HiPencil size={"20"} className="mr-2" />
              Editar item
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <HiOutlineTrash size={"20"} className="mr-2" />
              Eliminar item
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
