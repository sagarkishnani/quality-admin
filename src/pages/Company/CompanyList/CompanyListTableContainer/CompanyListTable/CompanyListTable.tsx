import { Avatar, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  HiOutlineDotsHorizontal,
  HiPencil,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConstantLocalStorage } from "../../../../../common/constants";

interface TicketListTableInterface {
  rows: Row[];
}

interface Row {
  IdCompany: string;
  Name: string;
  ImgUrl: string;
  Ruc: number;
  Address: string;
  MainContactName: string;
  MainContactEmail: string;
}

export const CompanyListTable = ({ rows }: TicketListTableInterface) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
    secureLocalStorage.setItem(ConstantLocalStorage.ID_COMPANY, id);
  };

  const handleView = () => {
    navigate("ver");
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "Name",
      headerName: "Empresa",
      width: 260,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={params.row.ImgUrl}
              alt={params.row.Name}
              sx={{ marginRight: 2 }}
            />
            <div>{params.value}</div>
          </div>
        );
      },
    },
    {
      field: "Ruc",
      headerName: "RUC",
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: "Address",
      headerName: "Dirección fiscal",
      width: 220,
      disableColumnMenu: true,
    },
    {
      field: "MainContactName",
      headerName: "Contacto principal",
      width: 220,
      disableColumnMenu: true,
    },
    {
      field: "MainContactEmail",
      headerName: "C.E. Contacto principal",
      width: 220,
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
                getRowId={(row) => row.IdCompany}
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
              Ver empresa
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <HiPencil size={"20"} className="mr-2" />
              Editar empresa
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <HiOutlineTrash size={"20"} className="mr-2" />
              Eliminar empresa
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};
