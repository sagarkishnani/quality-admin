import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { InputLabel, TextField } from "@mui/material"
import moment from "moment"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { useTicket } from "../../../../../common/contexts/TicketContext"

export const TicketRegisterViewFormOne = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setTicketStep } = useTicket()

  function registerTicketStep() {
    setTicketStep(2)
  }

  const formik = useFormik({
    initialValues: {
      IdTicketStatus: "",
      IdTicketCompany: "",
      IdTicketType: "",
      Address: "",
      CompanyFloor: "",
      CompanyArea: "",
      IdTechnician: "",
      IdUser: "",
      ScheduledAppointmentInitTime: moment(new Date()),
      ScheduledAppointmentEndTime: moment(new Date()),
      ScheduledAppointmentDate: moment(new Date()),
      ScheduledAppointmentTime: moment(new Date()),
      ReportedFailure: "",
    },
    onSubmit: (values) => {
      registerTicketStep()
    },
  })

  useEffect(() => {
    setIsLoading(true)
    console.log(ticket)
    if (ticket) {
      formik.setValues({
        IdTicketStatus: ticket.IdTicketStatus || "",
        IdTicketCompany: ticket.Company.Name || "",
        IdTicketType: ticket.IdTicketType || "",
        Address: ticket.Company.Address || "",
        CompanyFloor: ticket.CompanyFloor || "",
        CompanyArea: ticket.CompanyArea || "",
        IdUser: ticket?.User.Name || "",
        IdTechnician: "",
        ScheduledAppointmentInitTime: ticket?.ScheduledAppointmentInitTime,
        ScheduledAppointmentEndTime: ticket?.ScheduledAppointmentEndTime,
        ScheduledAppointmentDate: ticket?.ScheduledAppointmentDate,
        ScheduledAppointmentTime: ticket?.ScheduledAppointmentTime,
        ReportedFailure: ticket.ReportedFailure || "",
      })
    }
    setIsLoading(false)
  }, [ticket])

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <h2 className="font-semibold text-xl pb-2">
            Reporte de servicio técnico
          </h2>
        </div>
        <div className="col-span-4 justify-end flex">
          <h2 className="font-semibold text-qGray pb-2">
            {moment(ticket?.RecordCreationDate).format("DD/MM/YYYY")}
          </h2>
        </div>
        {ticket?.TicketStatus?.Name !== "Pendiente" &&
          ticket?.TicketStatus?.Name !== "En progreso" && (
            <>
              <div className="col-span-6">
                <InputLabel id="ScheduledAppointmentInitTime">
                  Hora inicio
                </InputLabel>
                <TimePicker
                  disabled
                  className="w-full"
                  value={moment(formik.values.ScheduledAppointmentInitTime)}
                />
              </div>
              <div className="col-span-6">
                <InputLabel id="ScheduledAppointmentEndTime">
                  Hora fin
                </InputLabel>
                <TimePicker
                  disabled
                  className="w-full"
                  value={moment(formik.values.ScheduledAppointmentEndTime)}
                />
              </div>
            </>
          )}
        {ticket?.TicketStatus?.Name == "Pendiente" ||
          (ticket?.TicketStatus?.Name == "En progreso" && (
            <>
              <div className="col-span-6">
                <InputLabel id="ScheduledAppointmentDate">
                  Fecha programada de inicio
                </InputLabel>
                <DatePicker
                  disabled
                  className="w-full"
                  value={moment(formik.values.ScheduledAppointmentDate)}
                />
              </div>
              <div className="col-span-6">
                <InputLabel id="ScheduledAppointmentTime">
                  Hora programada de inicio
                </InputLabel>
                <TimePicker
                  disabled
                  className="w-full"
                  value={moment(formik.values.ScheduledAppointmentTime)}
                />
              </div>
            </>
          ))}
        <div className="col-span-6">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="IdTicketCompany"
            name="IdTicketCompany"
            value={formik.values.IdTicketCompany}
            label="Empresa"
          />
        </div>
        <div className="col-span-6">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="Address"
            name="Address"
            value={formik.values.Address}
            label="Dirección"
          />
        </div>
        <div className="col-span-6">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="CompanyFloor"
            name="CompanyFloor"
            value={formik.values.CompanyFloor}
            label="Piso"
          />
        </div>
        <div className="col-span-6">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="CompanyArea"
            name="CompanyArea"
            value={formik.values.CompanyArea}
            label="Área"
          />
        </div>
        <div className="col-span-12">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="User"
            name="User"
            value={formik.values.IdUser}
            label="Usuario"
          />
        </div>
        {ticket?.TicketStatus?.Name == "En progreso" && (
          <div className="col-span-12">
            <TextField
              disabled
              color="primary"
              className="w-full"
              id="IdTechnician"
              name="IdTechnician"
              value={formik.values.IdTechnician}
              label="Técnico"
            />
          </div>
        )}
      </div>
      {ticket?.TicketStatus?.Name !== "Pendiente" &&
        ticket?.TicketStatus?.Name !== "En progreso" && (
          <div className="w-full mt-4 flex justify-end">
            <button
              className={`px-10 py-2 font-medium rounded-full text-white ${
                formik.isValid ? "bg-qGreen hover:bg-qDarkGreen" : "bg-qGray"
              }`}
              onClick={registerTicketStep}
              type="button"
            >
              Siguiente
            </button>
          </div>
        )}
    </>
  )
}
