import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { TextField } from "@mui/material"
import moment from "moment"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import {
  ConstantFilePurpose,
  ConstantLocalStorage,
  ConstantRoles,
} from "../../../../../common/constants"
import secureLocalStorage from "react-secure-storage"

export const TicketRegisterViewFormSix = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [firstSignature, setFirstSignature] = useState<string>("")
  const [secondSignature, setSecondSignature] = useState<string>("")
  const { user } = useAuth()
  const { setTicketStep } = useTicket()

  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
  const bucketUrl = "/storage/v1/object/public/media/"

  function registerTicketStep(isNext: boolean) {
    isNext ? setTicketStep(7) : setTicketStep(5)
  }

  const formik = useFormik({
    initialValues: {
      Comment: "",
      Recommendation: "",
      ResponsibleName: "",
      ResponsibleDni: "",
      TechnicianName: "",
      TechnicianDni: "",
    },
    onSubmit: (values) => {},
  })

  function isFacturableView() {
    return secureLocalStorage.getItem(ConstantLocalStorage.TICKET_FACTURABLE)
  }

  useEffect(() => {
    setIsLoading(true)
    if (ticket) {
      formik.setValues({
        Comment: ticket?.Comment || "",
        Recommendation: ticket?.Recommendation || "",
        ResponsibleName: ticket?.ResponsibleName || "",
        ResponsibleDni: ticket?.ResponsibleDni || "",
        TechnicianName: ticket?.TechnicianName || "",
        TechnicianDni: ticket?.TechnicianDni || "",
      })
    }

    const firstSign = ticket?.TicketFile.filter(
      (picture) => picture.FilePurpose === ConstantFilePurpose.FIRMA_USUARIO
    )
    setFirstSignature(firstSign[0].FileUrl)

    const secondSign = ticket?.TicketFile.filter(
      (picture) => picture.FilePurpose === ConstantFilePurpose.FIRMA_TECNICO
    )
    setSecondSignature(secondSign[0].FileUrl)

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
        <div className="col-span-12">
          <label>Comentario</label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2"
            disabled
            name="Comment"
            id="Comment"
            rows={2}
            value={formik.values.Comment}
          ></textarea>
        </div>
        <div className="col-span-12">
          <label>Recomendaciones</label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2"
            disabled
            name="Recommendation"
            id="Recommendation"
            rows={2}
            value={formik.values.Recommendation}
          ></textarea>
        </div>
        <div className="order-1 md:order-none col-span-12 md:col-span-5 border-gray-400 border-2 rounded-md w-full md:w-80 h-32">
          <img
            className="w-full h-full bg-cover"
            src={supabaseUrl + bucketUrl + firstSignature}
            alt=""
          />
        </div>
        <div className="hidden md:block col-span-2"></div>
        <div className="order-5 md:order-none col-span-12 md:col-span-5 border-gray-400 border-2 rounded-md w-full md:w-80 h-32">
          <img
            className="w-full h-full bg-cover"
            src={supabaseUrl + bucketUrl + secondSignature}
            alt=""
          />
        </div>
        <div className="order-2 md:order-none col-span-12 md:col-span-5 -mt-3">
          <p>Firma del responsable (*)</p>
        </div>
        <div className="hidden md:block col-span-2"></div>
        <div className="order-6 md:order-none col-span-12 md:col-span-5 -mt-3">
          <p>Firma del técnico responsable</p>
        </div>
        <div className="order-3 md:order-none col-span-12 md:col-span-5">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="ResponsibleName"
            name="ResponsibleName"
            value={formik.values.ResponsibleName}
            label="Nombre"
          />
        </div>
        <div className="hidden md:block col-span-2"></div>
        <div className="order-7 md:order-none col-span-12 md:col-span-5">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="TechnicianName"
            name="TechnicianName"
            value={formik.values.TechnicianName}
            label="Nombre técnico"
          />
        </div>
        <div className="order-4 md:order-none col-span-12 md:col-span-5">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="ResponsibleDni"
            name="ResponsibleDni"
            value={formik.values.ResponsibleDni}
            label="DNI"
          />
        </div>
        <div className="hidden md:block col-span-2"></div>
        <div className="order-8 md:order-none col-span-12 md:col-span-5">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="TechnicianDni"
            name="TechnicianDni"
            value={formik.values.TechnicianDni}
            label="DNI"
          />
        </div>
      </div>

      <div className="w-full mt-8 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3 md:justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkerBlue`}
          onClick={() => registerTicketStep(false)}
          type="button"
        >
          Anterior
        </button>
        {((ticket?.TicketStatus?.Name == "Atendido" &&
          user?.IdRole == ConstantRoles.LIDER_FUNCIONAL &&
          ticket?.TicketType?.Name == "Facturable" &&
          isFacturableView()) ||
          ((ticket?.TicketStatus?.Name == "Finalizado" ||
            ticket?.TicketStatus?.Name == "En espera" ||
            ticket?.TicketStatus?.Name == "Cancelado") &&
            user?.IdRole !== ConstantRoles.TECNICO &&
            ticket?.TicketType?.Name == "Facturable")) && (
          <button
            className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkGreen`}
            type="button"
            onClick={() => registerTicketStep(true)}
          >
            Siguiente
          </button>
        )}
      </div>
    </>
  )
}
