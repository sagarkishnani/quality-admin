import { useEffect, useState, useRef } from "react"
import { useFormik } from "formik"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { TextField } from "@mui/material"
import moment from "moment"
import CanvasDraw from "react-canvas-draw"
import { AiOutlineClear } from "react-icons/ai"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import { ConstantRoles } from "../../../../../common/constants"

export const TicketRegisterViewFormSix = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { user } = useAuth()
  const firstSignature = useRef(null)
  const secondSignature = useRef(null)
  const { setTicketStep } = useTicket()

  function clearSignature(signature: number) {
    signature == 1
      ? firstSignature?.current.clear()
      : secondSignature?.current.clear()
  }

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
        <div className="col-span-5 border-gray-400 border-2 rounded-md">
          <CanvasDraw
            ref={firstSignature}
            canvasHeight={120}
            canvasWidth={320}
            hideInterface={true}
            brushRadius={2}
            brushColor="black"
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5 border-gray-400 border-2 rounded-md">
          <CanvasDraw
            ref={secondSignature}
            canvasHeight={120}
            canvasWidth={320}
            hideInterface={true}
            brushRadius={2}
            brushColor="black"
          />
        </div>
        <div className="col-span-5 -mt-3">
          <div className="flex justify-end pr-1">
            <button onClick={() => clearSignature(1)} type="button">
              <AiOutlineClear size={20} color={"#00A0DF"} />
            </button>
          </div>
          <p>Firma del responsable (*)</p>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5 -mt-3">
          <div className="flex justify-end pr-1">
            <button onClick={() => clearSignature(2)} type="button">
              <AiOutlineClear size={20} color={"#00A0DF"} />
            </button>
          </div>
          <p>Firma del técnico responsable</p>
        </div>
        <div className="col-span-5">
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
        <div className="col-span-2"></div>
        <div className="col-span-5">
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
        <div className="col-span-5">
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
        <div className="col-span-2"></div>
        <div className="col-span-5">
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

      <div className="w-full mt-8 flex space-x-3 justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkerBlue`}
          onClick={() => registerTicketStep(false)}
          type="button"
        >
          Anterior
        </button>
        {
          /* {ticket?.TicketStatus?.Name == "Finalizado" && */ user?.IdRole ==
            ConstantRoles.LIDER_FUNCIONAL &&
            ticket?.TicketType?.Name == "Facturable" && (
              <button
                className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkGreen`}
                type="button"
                onClick={() => registerTicketStep(true)}
              >
                Siguiente
              </button>
            )
        }
      </div>
    </>
  )
}