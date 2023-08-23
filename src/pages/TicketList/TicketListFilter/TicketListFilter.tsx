import { Checkbox, FormControlLabel } from "@mui/material";

export const TicketListFilter = () => {
  return (
    <div className="shadow-gray-300 shadow-sm h-full w-3/12 p-8 flex flex-col">
      <div>
        <h2 className="font-semibold text-lg pb-2">Filtros</h2>
      </div>
      <div>
        <h4 className="text-qGreen font-medium pb-2">Estado del ticket</h4>
        <div className="grid grid-cols-2 text-sm pb-2">
          <FormControlLabel
            className="!text-xs"
            control={<Checkbox />}
            label="Pendiente"
          />
          <FormControlLabel control={<Checkbox />} label="En progreso" />
          <FormControlLabel control={<Checkbox />} label="Atendido" />
          <FormControlLabel control={<Checkbox />} label="Finalizado" />
          <FormControlLabel control={<Checkbox />} label="Cancelado" />
        </div>
      </div>
      <div>
        <h4 className="text-qGreen font-medium pb-2">Fecha</h4>
        <div className="grid grid-cols-2 text-sm pb-2">DATEPICKER</div>
      </div>
      <div>
        <h4 className="text-qGreen font-medium pb-2">Tipo</h4>
        <div className="grid grid-cols-2 text-sm">
          <FormControlLabel control={<Checkbox />} label="Facturable" />
          <FormControlLabel control={<Checkbox />} label="No facturable" />
        </div>
      </div>
    </div>
  );
};
