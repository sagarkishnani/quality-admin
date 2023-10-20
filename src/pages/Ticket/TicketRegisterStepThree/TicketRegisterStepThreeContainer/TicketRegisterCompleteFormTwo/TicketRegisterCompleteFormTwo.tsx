import { useEffect, useState } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantLocalStorage,
  ConstantsMasterTable,
} from "../../../../../common/constants"
import { useFormik } from "formik"
import {
  GetTicketById,
  TicketRegisterStepThreeRequestFormTwo,
} from "../../../../../common/interfaces/Ticket.interface"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { TicketService } from "../../../../../common/services/TicketService"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import moment from "moment"
import { TimePicker } from "@mui/x-date-pickers"
import { Button } from "../../../../../common/components/Button/Button"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { MasterTable } from "../../../../../common/interfaces/MasterTable.interface"
import { MasterTableService } from "../../../../../common/services/MasterTableService"
import { ImageModal } from "../../../../../common/components/ImageModal/ImageModal"

const validationSchema = yup.object({
  // Dni: yup
  //   .string()
  //   .required()
  //   .matches(/^[0-9]+$/, "Deben ser solo números")
  //   .min(8, "El DNI debe tener como mínimo 8 caracteres")
  //   .max(8, "El DNI debe tener como máximo 8 caracteres"),
  // Name: yup
  //   .string()
  //   .required("Nombre es obligatorio")
  //   .min(3, "El Nombre debe tener como mínimo 3 caracteres"),
  // PhoneNumber: yup.number().required("Celular es obligatorio"),
  // IdRole: yup.string().required("Rol es obligatorio"),
  // IdCompany: yup.string().required("Empresa es obligatorio"),
  // Position: yup.string().required("Cargo es obligatorio"),
  // email: yup
  //   .string()
  //   .required("Correo es obligatorio")
  //   .email("Debe ser un correo"),
  // password: yup
  //   .string()
  //   .min(6, "La contraseña debe tener como mínimo 6 caracteres")
  //   .required("Contraseña es obligatoria"),
})

export const TicketRegisterCompleteFormTwo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [devices, setDevices] = useState<MasterTable[]>([])
  const [ticketFormTwo, setTicketFormTwo] = useState<any>()
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const [pictures, setPictures] = useState<string[]>([])
  const { user } = useAuth()
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

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
    }
  }

  async function getDevices() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.DEVICES
    )
    if (data) {
      setDevices(data)
    }
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
    await getDevices()
    setIsLoading(false)
  }

  async function registerTicketStep(isNext: boolean) {
    const requestFormTwo: TicketRegisterStepThreeRequestFormTwo = {
      DeviceOne: formik.values.DeviceOne,
      CounterOne: formik.values.CounterOne,
      GuideOne: formik.values.GuideOne,
      DeviceTwo: formik.values.DeviceTwo,
      CounterTwo: formik.values.CounterTwo,
      GuideTwo: formik.values.GuideTwo,
      FoundFailure: formik.values.FoundFailure,
    }

    secureLocalStorage.setItem(
      ConstantLocalStorage.TICKET_STEP_THREE_FORM_TWO,
      requestFormTwo
    )

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
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  })

  useEffect(() => {
    const idTicket = secureLocalStorage.getItem(ConstantLocalStorage.ID_TICKET)
    if (idTicket !== null) {
      getAll(idTicket)
    }
  }, [])

  useEffect(() => {
    setTicketFormTwo(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_TWO
      )
    )
    if (ticket) {
      formik.setValues({
        DeviceOne: ticketFormTwo?.DeviceOne || "",
        CounterOne: ticketFormTwo?.CounterOne || "",
        GuideOne: ticketFormTwo?.GuideOne || "",
        DeviceTwo: ticketFormTwo?.DeviceTwo || "",
        CounterTwo: ticketFormTwo?.CounterTwo || "",
        GuideTwo: ticketFormTwo?.GuideTwo || "",
        ReportedFailure: ticket.ReportedFailure || "",
        FoundFailure: ticketFormTwo?.FoundFailure || "",
      })
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
        <div className="col-span-4">
          <FormControl fullWidth>
            <InputLabel id="DeviceOneLabel">Equipo</InputLabel>
            <Select
              labelId="DeviceOneLabel"
              id="DeviceOne"
              name="DeviceOne"
              value={formik.values.DeviceOne}
              onChange={formik.handleChange}
            >
              {devices?.map((device: MasterTable) => (
                <MenuItem key={device.IdMasterTable} value={device.Name}>
                  {device.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-4">
          <TextField
            color="primary"
            className="w-full"
            id="CounterOne"
            name="CounterOne"
            value={formik.values.CounterOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.CounterOne && Boolean(formik.errors.CounterOne)
            }
            helperText={formik.touched.CounterOne && formik.errors.CounterOne}
            label="Contador"
          />
        </div>
        <div className="col-span-4">
          <TextField
            color="primary"
            className="w-full"
            id="GuideOne"
            name="GuideOne"
            value={formik.values.GuideOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GuideOne && Boolean(formik.errors.GuideOne)}
            helperText={formik.touched.GuideOne && formik.errors.GuideOne}
            label="# Guía"
          />
        </div>
        <div className="col-span-4">
          <FormControl fullWidth>
            <InputLabel id="DeviceTwoLabel">Equipo (R)</InputLabel>
            <Select
              labelId="DeviceTwoLabel"
              id="DeviceTwo"
              name="DeviceTwo"
              value={formik.values.DeviceTwo}
              onChange={formik.handleChange}
            >
              {devices?.map((device: MasterTable) => (
                <MenuItem key={device.IdMasterTable} value={device.Name}>
                  {device.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-4">
          <TextField
            color="primary"
            className="w-full"
            id="CounterTwo"
            name="CounterTwo"
            value={formik.values.CounterTwo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.CounterTwo && Boolean(formik.errors.CounterTwo)
            }
            helperText={formik.touched.CounterTwo && formik.errors.CounterTwo}
            label="Contador"
          />
        </div>
        <div className="col-span-4">
          <TextField
            color="primary"
            className="w-full"
            id="GuideTwo"
            name="GuideTwo"
            value={formik.values.GuideTwo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GuideTwo && Boolean(formik.errors.GuideTwo)}
            helperText={formik.touched.GuideTwo && formik.errors.GuideTwo}
            label="# Guía"
          />
        </div>
        <div className="col-span-12">
          <TextField
            color="primary"
            className="w-full"
            type="text"
            disabled
            id="ReportedFailure"
            name="ReportedFailure"
            value={formik.values.ReportedFailure}
            label="Falla reportada"
          />
        </div>
        <div className="col-span-12">
          <TextField
            color="primary"
            multiline
            minRows={5}
            className="w-full"
            type="text"
            id="FoundFailure"
            name="FoundFailure"
            value={formik.values.FoundFailure}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.FoundFailure && Boolean(formik.errors.FoundFailure)
            }
            helperText={
              formik.touched.FoundFailure && formik.errors.FoundFailure
            }
            label="Falla encontrada"
          />
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
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white`}
          onClick={() => registerTicketStep(false)}
          type="button"
        >
          Anterior
        </button>
        <button
          className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white`}
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
