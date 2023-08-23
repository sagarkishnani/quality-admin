import { useEffect, useState } from "react";
import { TicketService } from "../../../common/services/TicketService";
import { TicketListTable } from "./TicketListTable/TicketListTable";
import { HiSearch } from "react-icons/hi";
import { Button } from "../../../common/components/Button/Button";

export const TicketListTableContainer = () => {
  const [tickets, setTickets] = useState([]);

  async function getTickets() {
    const data = await TicketService.getTickets();
    if (data) {
      const output_data = data.map((entry) => ({
        id: entry.CodeTicket,
        CodeTicket: entry.CodeTicket,
        Company: entry?.IdTicketCompany,
        Status: entry.TicketStatus.Name,
        Type: entry.TicketType !== null ? entry.TicketType.Name : "NO DEFINIDO",
        Technician:
          entry?.IdTechnician !== null ? entry?.IdTechnician : "NO ASIGNADO",
        RecordCreationDate: entry.RecordCreationDate,
        AppointmentDate: entry.AppointmentDate,
      }));
      setTickets(output_data);
    }
  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="flex-1">
      <div className="px-4 py-8 flex justify-between">
        <div className="flex flex-row flex-wrap items-center">
          <div>
            <h3 className="text-lg font-semibold mr-4">Tickets</h3>
          </div>
          <div className="flex flex-row items-center justify-center flex-wrap w-[28rem] rounded-full bg-qLightGray p-2 border-qGray border-2">
            <div className="w-8 flex justify-center">
              <HiSearch color="#989898" size={"16"} />
            </div>
            <input
              placeholder="Busca por número de ticket"
              className="flex-1 bg-transparent focus:outline-none text-sm"
              type="text"
            />
          </div>
        </div>
        <div className="mr-6">
          <Button type="button" color="#74C947" label="Agregar ticket" />
        </div>
      </div>
      <TicketListTable rows={tickets} />
    </div>
  );
};
