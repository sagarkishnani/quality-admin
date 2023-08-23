import { Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import {
  HiOutlineDotsHorizontal,
  HiPencil,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi";

interface UserListTableInterface {
  rows: Row[];
}

interface Row {
  IdMasterTable: string;
  IdMasterTableParent: string;
  Name: string;
  Order: string;
  RecordCreationDate: Date;
  RecordEditDate: Date;
}

export const UserListTable = ({ rows }: UserListTableInterface) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
    console.log(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "IdMasterTable",
      headerName: "Id",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "IdMasterTableParent",
      headerName: "Id Padre",
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
      field: "Order",
      headerName: "Orden",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "RecordCreationDate",
      headerName: "Fecha de creación",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "RecordEditDate",
      headerName: "Fecha de edición",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "Detail",
      headerName: "",
      width: 80,
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleDetailClick = (event: React.MouseEvent<HTMLDivElement>) => {
          handleClick(event, params.row.IdCompany);
        };

        return (
          <>
            <div
              className="flex w-full justify-center text-center cursor-pointer"
              onClick={handleDetailClick}
            >
              <HiOutlineDotsHorizontal color="black" size={"30"} />
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      {rows.length == 0 && (
        <div className="flex-1">No se encontraron resultados</div>
      )}
      {rows.length !== 0 && (
        <>
          <div className="flex-1">
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                getRowId={(row) => row.IdMasterTable}
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
            <MenuItem onClick={handleClose}>
              <HiOutlineEye size={"20"} className="mr-2" />
              Ver item
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <HiPencil size={"20"} className="mr-2" />
              Editar item
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <HiOutlineTrash size={"20"} className="mr-2" />
              Eliminar item
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};
