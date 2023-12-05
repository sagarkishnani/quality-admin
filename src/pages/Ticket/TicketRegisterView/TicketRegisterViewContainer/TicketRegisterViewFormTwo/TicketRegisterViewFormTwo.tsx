import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import { TextField } from "@mui/material"
import moment from "moment"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { ImageModal } from "../../../../../common/components/ImageModal/ImageModal"

export const TicketRegisterViewFormTwo = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const [pictures, setPictures] = useState<string[]>([])
  const { setTicketStep } = useTicket()

  const onChangePicture = (e: any) => {
    const newPictures: string[] = []
    const files = e.target.files

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()

      reader.onload = (e) => {
        newPictures.push(e.target?.result)
        if (newPictures.length === files.length) {
          setPictures([...pictures, ...newPictures])
        }
      }

      reader.readAsDataURL(files[i])
    }
  }

  const handleOpenImageModal = (imgData: string) => {
    setIsImageModal(true)
    setSelectedImg(imgData)
  }

  const handleCloseImageModal = () => {
    setIsImageModal(false)
  }

  async function registerTicketStep(isNext: boolean) {
    isNext ? setTicketStep(3) : setTicketStep(1)
  }

  const formik = useFormik({
    initialValues: {
      DeviceOne: "",
      CounterOne: "",
      GuideOne: "",
      DeviceTwo: "",
      CounterTwo: "",
      GuideTwo: "",
      ReportedFailure: "",
      FoundFailure: "",
    },
    onSubmit: (values) => {},
  })

  useEffect(() => {
    setIsLoading(true)
    if (ticket) {
      formik.setValues({
        DeviceOne: ticket?.DeviceOne || "",
        CounterOne: ticket?.CounterOne || "",
        GuideOne: ticket?.GuideOne || "",
        DeviceTwo: ticket?.DeviceTwo || "",
        CounterTwo: ticket?.CounterTwo || "",
        GuideTwo: ticket?.GuideTwo || "",
        ReportedFailure: ticket.ReportedFailure || "",
        FoundFailure: ticket?.FoundFailure || "",
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
        <div className="col-span-4">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="DeviceOne"
            name="DeviceOne"
            value={formik.values.DeviceOne}
            label="Equipo"
          />
        </div>
        <div className="col-span-4">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="CounterOne"
            name="CounterOne"
            value={formik.values.CounterOne}
            label="Contador"
          />
        </div>
        <div className="col-span-4">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="GuideOne"
            name="GuideOne"
            value={formik.values.GuideOne}
            label="# Guía"
          />
        </div>
        <div className="col-span-4">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="DeviceTwo"
            name="DeviceTwo"
            value={formik.values.DeviceTwo}
            label="Equipo (R)"
          />
        </div>
        <div className="col-span-4">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="CounterTwo"
            name="CounterTwo"
            value={formik.values.CounterTwo}
            label="Contador"
          />
        </div>
        <div className="col-span-4">
          <TextField
            disabled
            color="primary"
            className="w-full"
            id="GuideTwo"
            name="GuideTwo"
            value={formik.values.GuideTwo}
            label="# Guía"
          />
        </div>
        <div className="col-span-12">
          <label>Falla reportada</label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2 bg-white text-gray-400"
            disabled
            name="ReportedFailure"
            id="ReportedFailure"
            rows={3}
            value={formik.values.ReportedFailure}
          ></textarea>
        </div>
        <div className="col-span-12">
          <label>Falla encontrada</label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2 bg-white text-gray-400"
            disabled
            name="FoundFailure"
            id="FoundFailure"
            rows={3}
            value={formik.values.FoundFailure}
          ></textarea>
        </div>
        <div className="col-span-12">
          <div className="flex flex-row space-x-2">
            <h3>Evidencia(s)</h3>
            <div className="register_profile_image">
              <input
                id="profilePic"
                type="file"
                accept=".png, .jpg, .gif, .svg, .webp"
                onChange={onChangePicture}
                multiple
                className="border-none bg-none text-qBlue underline font-medium"
              />
            </div>
          </div>
          <div className="flex flex-row space-x-2 mt-4">
            {pictures.map((imgData, index) => (
              <div
                className="w-16 h-16 relative cursor-pointer"
                onClick={() => handleOpenImageModal(imgData)}
              >
                <img
                  key={index}
                  className="h-full w-full object-fill rounded-md absolute hover:opacity-60"
                  src={imgData}
                />
                <button className="w-8 h-8 absolute right-0 -top-4 bg-qBlue rounded-md hidden">
                  X
                </button>
              </div>
            ))}
          </div>
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
        <button
          className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkGreen`}
          onClick={() => registerTicketStep(true)}
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
