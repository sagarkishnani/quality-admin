import { Checkbox, FormControlLabel } from "@mui/material"
import { useFormik } from "formik"
import { useState } from "react"
import { Button } from "../../../../common/components/Button/Button"
import {
  ConstantMessage,
  ConstantRoles,
  ConstantTicketStatus,
  ConstantTicketTypes,
} from "../../../../common/constants"
import { FilteredTicketsRequest } from "../../../../common/interfaces/Ticket.interface"
import { TicketService } from "../../../../common/services/TicketService"
import { Modal } from "../../../../common/components/Modal/Modal"
import { DatePicker } from "@mui/x-date-pickers"
import moment from "moment"
import { useTicket } from "../../../../common/contexts/TicketContext"
import { useAuth } from "../../../../common/contexts/AuthContext"

export const TicketListFilter = () => {
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const { setFilteredTickets } = useTicket()
  const { user } = useAuth()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  async function filterTickets(
    pending: string | null,
    enProgreso: string | null,
    atendido: string | null,
    finalizado: string | null,
    cancelado: string | null,
    facturable: string | null,
    noFacturable: string | null,
    recordCreationDate: any | null
  ) {
    setIsLoadingAction(true)

    const requestFilter: FilteredTicketsRequest = {
      IdCompany:
        user?.IdRole === ConstantRoles.LIDER_FUNCIONAL ||
        user?.IdRole === ConstantRoles.ADMINISTRADOR_TI ||
        user?.IdRole === ConstantRoles.TECNICO
          ? null
          : user?.IdCompany,
      IdTechnician:
        user?.IdRole === ConstantRoles.TECNICO ? user?.IdUser : null,
      Pending: pending,
      InProgress: enProgreso,
      Attended: atendido,
      Finished: finalizado,
      Cancelled: cancelado,
      Facturable: facturable,
      NotFacturable: noFacturable,
      RecordCreationDate: recordCreationDate,
    }

    const data: any = await TicketService.getFilteredTickets(requestFilter)

    if (data) {
      setFilteredTickets(data)
      setIsLoadingAction(false)
    } else {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantMessage.SERVICE_ERROR)
    }
  }

  function validateForm(values: any) {
    let pendiente = null,
      enProgreso = null,
      atendido = null,
      finalizado = null,
      cancelado = null,
      facturable = null,
      noFacturable = null,
      recordCreationDate = null

    if (values.Pending === true) {
      pendiente = ConstantTicketStatus.PENDIENTE
    }

    if (values.Pending === false) {
      pendiente = null
    }

    if (values.InProgress === true) {
      enProgreso = ConstantTicketStatus.EN_PROGRESO
    }

    if (values.InProgress === false) {
      enProgreso = null
    }

    if (values.Attended === true) {
      atendido = ConstantTicketStatus.ATENDIDO
    }

    if (values.Attended === false) {
      atendido = null
    }

    if (values.Finished === true) {
      finalizado = ConstantTicketStatus.FINALIZADO
    }

    if (values.Finished === false) {
      finalizado = null
    }

    if (values.Cancelled === true) {
      cancelado = ConstantTicketStatus.CANCELADO
    }

    if (values.Cancelled === false) {
      cancelado = null
    }

    if (values.Facturable === true) {
      facturable = ConstantTicketTypes.FACTURABLE
    }

    if (values.Facturable === false) {
      facturable = null
    }

    if (values.NotFacturable === true) {
      noFacturable = ConstantTicketTypes.NO_FACTURABLE
    }

    if (values.NotFacturable === false) {
      noFacturable = null
    }

    if (values.RecordCreationDate)
      recordCreationDate = values.RecordCreationDate?._d.toISOString()

    if (!values.RecordCreationDate) {
      recordCreationDate = null
    }

    filterTickets(
      pendiente,
      enProgreso,
      atendido,
      finalizado,
      cancelado,
      facturable,
      noFacturable,
      recordCreationDate
    )
  }

  const formik = useFormik({
    initialValues: {
      Pending: false,
      InProgress: false,
      Attended: false,
      Finished: false,
      Cancelled: false,
      Facturable: false,
      NotFacturable: false,
      RecordCreationDate: null,
    },
    onSubmit: (values) => {
      validateForm(values)
    },
  })

  return (
    <div className="shadow-gray-300 shadow-sm w-full md:h-full xl:w-3/12 p-8 flex flex-row xl:flex-col">
      <form
        className="w-full"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="grid grid-cols-4">
          <div className="col-span-4">
            <h2 className="font-semibold text-lg pb-2">Filtros</h2>
          </div>
          <div className="col-span-4 md:col-span-2 xl:col-span-4">
            <h4 className="text-qGreen font-medium pb-2">Estado del ticket</h4>
            <div className="grid grid-cols-2 text-sm pb-2">
              <FormControlLabel
                className="!text-xs"
                control={<Checkbox />}
                id="Pending"
                name="Pending"
                value={formik.values.Pending}
                onChange={formik.handleChange}
                label="Pendiente"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="En progreso"
                id="InProgress"
                value={formik.values.InProgress}
                onChange={formik.handleChange}
                name="InProgress"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Atendido"
                id="Attended"
                value={formik.values.Attended}
                onChange={formik.handleChange}
                name="Attended"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Finalizado"
                id="Finished"
                value={formik.values.Finished}
                onChange={formik.handleChange}
                name="Finished"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Cancelado"
                id="Cancelled"
                value={formik.values.Cancelled}
                onChange={formik.handleChange}
                name="Cancelled"
              />
            </div>
          </div>
          <div className="col-span-2 xl:col-span-4">
            <h4 className="text-qGreen font-medium pb-2">Fecha de registro</h4>
            <div className="text-sm pb-2">
              <DatePicker
                className="date-filter"
                format="DD/MM/YYYY"
                value={moment(formik.values.RecordCreationDate)}
                onChange={(value) =>
                  formik.setFieldValue("RecordCreationDate", value, true)
                }
              />
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 xl:col-span-4">
            <h4 className="text-qGreen font-medium pb-2">Tipo</h4>
            <div className="grid grid-cols-2 text-sm">
              <FormControlLabel
                id="Facturable"
                name="Facturable"
                control={<Checkbox />}
                value={formik.values.Facturable}
                onChange={formik.handleChange}
                label="Facturable"
              />
              <FormControlLabel
                id="NotFacturable"
                name="NotFacturable"
                control={<Checkbox />}
                value={formik.values.NotFacturable}
                onChange={formik.handleChange}
                label="No facturable"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8 col-span-4">
            <Button
              className="md:w-40 xl:w-3/4"
              color="#74C947"
              label="Aplicar filtros"
              disabled={isLoadingAction}
              isLoading={isLoadingAction}
              type="submit"
            />
          </div>
        </div>
      </form>
      <Modal
        modalType={modalType}
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
    </div>
  )
}
