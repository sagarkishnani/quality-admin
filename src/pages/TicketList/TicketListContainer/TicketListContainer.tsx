import { TicketListFilter } from "../TicketListFilter/TicketListFilter";
import { TicketListTableContainer } from "../TicketListTableContainer/TicketListTableContainer";

export const TicketListContainer = () => {
  return (
    <div className="flex flex-row flex-wrap flex-1">
      <TicketListFilter />
      <TicketListTableContainer />
    </div>
  );
};
