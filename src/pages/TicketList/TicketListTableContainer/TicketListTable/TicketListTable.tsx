import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Badge } from "../../../../common/components/Badge/Badge";
import { useEffect } from "react";

interface TicketListTableInterface {
  rows: Row[];
}

interface Row {
  IdTicket: number;
  CodeTicket: number;
  Company: string;
  Status: string;
  Type: string;
  Technician: string;
  RecordCreationDate: Date;
  AppointmentDate: Date;
}

export const TicketListTable = ({ rows }: TicketListTableInterface) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Ticket ID",
      width: 10,
      disableColumnMenu: true,
    },
    {
      field: "CodeTicket",
      headerName: "Ticket ID",
      width: 80,
      disableColumnMenu: true,
    },
    {
      field: "Company",
      headerName: "Empresa",
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: "Status",
      headerName: "Estado",
      width: 130,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <Badge status={params.value} label={params.value} />;
      },
    },
    { field: "Type", headerName: "Tipo", width: 130, disableColumnMenu: true },
    {
      field: "Technician",
      headerName: "Técnico",
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: "RecordCreationDate",
      headerName: "Fecha de registro",
      width: 120,
      disableColumnMenu: true,
    },
    {
      field: "AppointmentDate",
      headerName: "Fecha de atención",
      width: 120,
      disableColumnMenu: true,
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     CodeTicket: 1282382,
  //     Company: "Clínica JP",
  //     Status: "Finalizado",
  //     Type: "Facturable",
  //     Technician: "Sebastián Torres",
  //     RecordCreationDate: "02/08/23",
  //     AppointmentDate: "05/10/23",
  //   },
  //   {
  //     id: 2,
  //     CodeTicket: 1282323,
  //     Company: "Muestra Medics",
  //     Status: "En progreso",
  //     Type: "Facturable",
  //     Technician: "Sebastián Torres",
  //     RecordCreationDate: "02/08/23",
  //     AppointmentDate: "05/10/23",
  //   },
  // ];

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  return (
    <div className="flex-1">
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
  );
};
