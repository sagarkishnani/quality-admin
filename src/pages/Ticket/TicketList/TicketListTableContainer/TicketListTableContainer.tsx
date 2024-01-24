import { useEffect, useState } from "react"
import { TicketListTable } from "./TicketListTable/TicketListTable"
import { HiSearch } from "react-icons/hi"
import { Button } from "../../../../common/components/Button/Button"
import { TicketService } from "../../../../common/services/TicketService"
import { Link } from "react-router-dom"
import { Skeleton, Tooltip } from "@mui/material"
import { FilteredTicketsRequest } from "../../../../common/interfaces/Ticket.interface"
import { useTicket } from "../../../../common/contexts/TicketContext"
import { useAuth } from "../../../../common/contexts/AuthContext"
import { ConstantRoles } from "../../../../common/constants"
import { PiMicrosoftExcelLogoFill } from "react-icons/pi"
import { ExcelModal } from "../../../../common/components/ExcelModal/ExcelModal"

export const TicketListTableContainer = () => {
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage] = useState("Seleccione los filtros para exportar")
  const [searchValue, setSearchValue] = useState<string>("")
  const { filteredTickets } = useTicket()
  const { user } = useAuth()

  async function getFilteredTickets() {
    const requestFilter: FilteredTicketsRequest = {
      IdCompany:
        user?.IdRole === ConstantRoles.LIDER_FUNCIONAL ||
        user?.IdRole === ConstantRoles.ADMINISTRADOR_TI ||
        user?.IdRole === ConstantRoles.TECNICO
          ? null
          : user?.IdCompany,
      IdTechnician:
        user?.IdRole === ConstantRoles.TECNICO ? user?.IdUser : null,
      Pending: null,
      InProgress: null,
      Attended: null,
      Waiting: null,
      Open: null,
      Finished: null,
      Cancelled: null,
      Facturable: null,
      NotFacturable: null,
      RecordCreationDate: null,
    }
    const data = await TicketService.getFilteredTickets(requestFilter)

    if (data && !filteredTickets) {
      const output_data = data.map((entry) => ({
        id: entry.IdTicket,
        CodeTicket: entry.CodeTicket,
        Company: entry?.Company,
        ImgUrl: entry?.ImgUrl,
        Status: entry?.Status,
        Type: entry.Type !== null ? entry.Type : "NO DEFINIDO",
        Technician:
          entry?.IdTechnician !== null
            ? entry?.Technician
            : entry?.Technician == null && entry?.IsGuaranteeTechnician
            ? "Técnico de garantía"
            : "NO ASIGNADO",
        IsGuaranteeTechnician: entry?.IsGuaranteeTechnician,
        RecordCreationDate: entry.RecordCreationDate,
        AppointmentDate: entry.AppointmentDate,
      }))
      setTickets(output_data)
    } else if (data && filteredTickets!.length > 0) {
      const output_data = filteredTickets?.map((entry) => ({
        id: entry.IdTicket,
        CodeTicket: entry.CodeTicket,
        Company: entry?.Company,
        ImgUrl: entry?.ImgUrl,
        Status: entry?.Status,
        Type: entry.Type !== null ? entry.Type : "NO DEFINIDO",
        Technician:
          entry?.IdTechnician !== null
            ? entry?.Technician
            : entry?.Technician == null && entry?.IsGuaranteeTechnician
            ? "Técnico de garantía"
            : "NO ASIGNADO",
        IsGuaranteeTechnician: entry?.IsGuaranteeTechnician,
        RecordCreationDate: entry.RecordCreationDate,
        AppointmentDate: entry.AppointmentDate,
      }))
      setTickets(output_data)
    } else if (data && filteredTickets?.length === 0) {
      setTickets([])
    }
  }

  const handleOpenExcel = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  async function getAll() {
    setIsLoading(true)
    await getFilteredTickets()
    setIsLoading(false)
  }

  const filteredTicketsSearch = tickets.filter((ticket: any) => {
    const searchText = searchValue.toLowerCase()
    return (
      (ticket?.CodeTicket).toString().toLowerCase().includes(searchText) ||
      (ticket?.Company).toString().toLowerCase().includes(searchText)
    )
  })

  useEffect(() => {
    getAll()
  }, [filteredTickets])

  return (
    <>
      <div className="flex-1 lg:m-4 xl:m-0">
        <div className="px-4 py-8 lg:flex lg:justify-between">
          <div className="flex m-auto lg:m-0 flex-row flex-wrap items-center">
            <div className="w-full lg:w-auto text-center lg:text-left mb-3 lg:mb-0">
              <h3 className="text-lg font-semibold mr-4">Tickets</h3>
            </div>
            <div className="flex flex-row items-center justify-center flex-wrap w-full md:w-[28rem] rounded-full bg-qLightGray p-2 border-qGray border-2 md:m-auto lg:m-0">
              <div className="w-8 flex justify-center">
                <HiSearch color="#989898" size={"16"} />
              </div>
              <input
                placeholder="Busca por número de ticket o empresa"
                className="flex-1 bg-transparent focus:outline-none text-sm"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            {user?.IdRole === ConstantRoles.LIDER_FUNCIONAL && (
              <div className="ml-4 cursor-pointer" onClick={handleOpenExcel}>
                <Tooltip title="Exportar a Excel">
                  <button>
                    <PiMicrosoftExcelLogoFill
                      className="align-middle"
                      size={28}
                      color="#00A0DF"
                    />
                  </button>
                </Tooltip>
              </div>
            )}
            {/* <div className="cursor-pointer ml-4">
            <Tooltip title="Refrescar">
              <button onClick={getAll}>
                <HiRefresh color="#989898" size={"20"} />
              </button>
            </Tooltip>
          </div> */}
          </div>
          {user?.IdRole === ConstantRoles.USUARIO && (
            <div className="text-center mt-5 lg:mr-6 lg:text-left lg:mt-0">
              <Link to={"nuevo"}>
                <Button type="button" color="#74C947" label="Agregar ticket" />
              </Link>
            </div>
          )}
        </div>
        {isLoading && (
          <div className="p-4">
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
            <Skeleton height={40} animation="wave" />
          </div>
        )}
        {!isLoading && (
          <TicketListTable rows={filteredTicketsSearch} handleReload={getAll} />
        )}
      </div>
      <ExcelModal
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
    </>
  )
}
