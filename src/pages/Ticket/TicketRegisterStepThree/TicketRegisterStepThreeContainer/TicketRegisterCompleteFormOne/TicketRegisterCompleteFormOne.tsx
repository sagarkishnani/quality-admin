import { useEffect, useState } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantFilePurpose,
  ConstantLocalStorage,
} from "../../../../../common/constants"
import { useFormik } from "formik"
import {
  GetTicketById,
  TicketRegisterStepThreeRequestFormOne,
} from "../../../../../common/interfaces/Ticket.interface"
import { InputLabel, TextField } from "@mui/material"
import moment from "moment"
import { TimePicker } from "@mui/x-date-pickers"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { ImageModal } from "../../../../../common/components/ImageModal/ImageModal"

interface TicketRegisterCompleteFormOneInterface {
  ticket: GetTicketById
}

const validationSchema = yup.object({
  ScheduledAppointmentInitTime: yup
    .date()
    .required("Hora de inicio es obligatorio"),
  ScheduledAppointmentEndTime: yup
    .date()
    .required("Hora de fin es obligatorio"),
})

export const TicketRegisterCompleteFormOne = ({
  ticket,
}: TicketRegisterCompleteFormOneInterface) => {
  const [ticketFormOne, setTicketFormOne] = useState<any>()
  const [pictures, setTicketPictures] = useState<[]>()
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const { setTicketStep } = useTicket()

  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
  const bucketUrl = "/storage/v1/object/public/media/"

  function registerTicketStep() {
    if (formik.isValid) {
      const requestFormOne: TicketRegisterStepThreeRequestFormOne = {
        ScheduledAppointmentInitTime:
          formik.values.ScheduledAppointmentInitTime,
        ScheduledAppointmentEndTime: formik.values.ScheduledAppointmentEndTime,
      }

      secureLocalStorage.setItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_ONE,
        requestFormOne
      )

      setTicketStep(2)
    }
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
      ReportedFailure: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      registerTicketStep()
    },
  })

  useEffect(() => {
    setTicketFormOne(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_ONE
      )
    )

    if (ticket) {
      formik.setValues({
        IdTicketStatus: ticket.IdTicketStatus || "",
        IdTicketCompany: ticket.Company.Name || "",
        IdTicketType: ticket.IdTicketType || "",
        Address: ticket.Company.Address || "",
        CompanyFloor: ticket.CompanyFloor || "",
        CompanyArea: ticket.CompanyArea || "",
        IdUser: ticket?.User?.Name || "",
        IdTechnician: "",
        ScheduledAppointmentInitTime:
          ticketFormOne?.ScheduledAppointmentInitTime,
        ScheduledAppointmentEndTime: ticketFormOne?.ScheduledAppointmentEndTime,
        ReportedFailure: ticket.ReportedFailure || "",
      })

      const ticketPictures = ticket?.TicketFile.filter(
        (picture) => picture.FilePurpose === ConstantFilePurpose.IMAGEN_USUARIO
      )

      setTicketPictures(ticketPictures)
    }
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
        <div className="col-span-6">
          <InputLabel id="ScheduledAppointmentInitTime">Hora inicio</InputLabel>
          <TimePicker
            className="w-full"
            value={moment(formik.values.ScheduledAppointmentInitTime)}
            onChange={(value) =>
              formik.setFieldValue("ScheduledAppointmentInitTime", value, true)
            }
          />
        </div>
        <div className="col-span-6">
          <InputLabel id="ScheduledAppointmentEndTime">Hora fin</InputLabel>
          <TimePicker
            className="w-full"
            value={moment(formik.values.ScheduledAppointmentEndTime)}
            onChange={(value) =>
              formik.setFieldValue("ScheduledAppointmentEndTime", value, true)
            }
          />
        </div>
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
        {pictures?.length > 0 && (
          <div className="col-span-12 mt-4">
            <div className="flex flex-row space-x-2">
              <h3>Evidencia(s)</h3>
            </div>
            <div className="flex flex-row space-x-2 mt-4">
              {pictures?.map((picture, index) => (
                <div
                  className="w-16 h-16 relative cursor-pointer"
                  onClick={() =>
                    handleOpenImageModal(
                      supabaseUrl + bucketUrl + picture.FileUrl
                    )
                  }
                >
                  <img
                    key={index}
                    className="h-full w-full object-fill rounded-md absolute hover:opacity-60"
                    src={supabaseUrl + bucketUrl + picture.FileUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-full mt-4 flex justify-end">
        <button
          className={`px-10 py-2 font-medium rounded-full text-white ${
            formik.isValid
              ? "bg-qGreen hover:bg-qDarkGreen"
              : "bg-qGray cursor-default"
          }`}
          onClick={registerTicketStep}
          type="button"
        >
          Siguiente
        </button>
      </div>
      <ImageModal
        img={selectedImg}
        open={isImageModal}
        handleClose={handleCloseImageModal}
      />
    </>
  )
}
