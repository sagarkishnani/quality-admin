import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { InputLabel, TextField } from "@mui/material"
import moment from "moment"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { ImageModal } from "../../../../../common/components/ImageModal/ImageModal"
import { ConstantFilePurpose } from "../../../../../common/constants"

export const TicketRegisterViewFormOne = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pictures, setTicketPictures] = useState<[]>(ticket.TicketFile)
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const { setTicketStep } = useTicket()

  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
  const bucketUrl = "/storage/v1/object/public/media/"

  function registerTicketStep() {
    setTicketStep(2)
  }

  const handleOpenImageModal = (imgData: string) => {
    setIsImageModal(true)
    setSelectedImg(imgData)
  }

  const handleCloseImageModal = () => {
    setIsImageModal(false)
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

      const ticketPictures = ticket?.TicketFile.filter(
        (picture) => picture.FilePurpose === ConstantFilePurpose.IMAGEN_USUARIO
      )

      setTicketPictures(ticketPictures)
    }
    setIsLoading(false)
  }, [ticket])

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-semibold text-xl pb-2">
            Reporte de servicio técnico
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4 justify-end flex">
          <h2 className="font-semibold text-qGray pb-2">
            {moment(ticket?.RecordCreationDate).format("DD/MM/YYYY")}
          </h2>
        </div>
        {ticket?.TicketStatus?.Name !== "Pendiente" &&
          ticket?.TicketStatus?.Name !== "En progreso" && (
            <>
              <div className="col-span-12 md:col-span-6">
                <InputLabel id="ScheduledAppointmentInitTime">
                  Hora inicio
                </InputLabel>
                <TimePicker
                  disabled
                  className="w-full"
                  value={moment(formik.values.ScheduledAppointmentInitTime)}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
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
              <div className="col-span-12 md:col-span-6">
                <InputLabel id="ScheduledAppointmentDate">
                  Fecha programada de inicio
                </InputLabel>
                <DatePicker
                  disabled
                  className="w-full"
                  value={moment(formik.values.ScheduledAppointmentDate)}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
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
        <div className="col-span-12 md:col-span-6">
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
        <div className="col-span-12 md:col-span-6">
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
        <div className="col-span-12 md:col-span-6">
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
        <div className="col-span-12 md:col-span-6">
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
        {(ticket?.TicketStatus?.Name == "Pendiente" ||
          ticket?.TicketStatus?.Name == "En progreso") && (
          <div className="col-span-12">
            <textarea
              className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2 bg-white text-gray-400"
              disabled
              name="ReportedFailure"
              id="ReportedFailure"
              rows={3}
              value={formik.values.ReportedFailure}
            ></textarea>
          </div>
        )}
        {ticket?.TicketStatus?.Name == "En progreso" && (
          <div className="col-span-12">
            <TextField
              disabled
              color="primary"
              className="w-full"
              id="IdTechnician"
              name="IdTechnician"
              value={
                formik.values.IdTechnician === "" ||
                formik.values.IdTechnician === null
                  ? "Técnico de garantía"
                  : formik.values.IdTechnician
              }
              label="Técnico"
            />
          </div>
        )}
      </div>
      {pictures.length > 0 && (
        <div className="col-span-12 mt-4">
          <div className="flex flex-row space-x-2">
            <h3>Evidencia(s)</h3>
          </div>
          <div className="flex flex-row space-x-2 mt-4">
            {pictures.map((picture, index) => (
              <div
                key={index}
                className="w-16 h-16 relative cursor-pointer"
                onClick={() =>
                  handleOpenImageModal(
                    supabaseUrl + bucketUrl + picture.FileUrl
                  )
                }
              >
                <img
                  className="h-full w-full object-fill rounded-md absolute hover:opacity-60"
                  src={supabaseUrl + bucketUrl + picture.FileUrl}
                />
              </div>
            ))}
          </div>
        </div>
      )}
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
      <ImageModal
        img={selectedImg}
        open={isImageModal}
        handleClose={handleCloseImageModal}
      />
    </>
  )
}
