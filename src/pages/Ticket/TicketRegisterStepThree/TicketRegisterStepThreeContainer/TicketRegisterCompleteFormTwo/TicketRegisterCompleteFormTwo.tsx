import { useEffect, useState } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantFilePurpose,
  ConstantLocalStorage,
  ConstantsMasterTable,
} from "../../../../../common/constants"
import { useFormik } from "formik"
import {
  GetTicketById,
  TicketRegisterStepThreeRequestFormTwo,
} from "../../../../../common/interfaces/Ticket.interface"
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material"
import moment from "moment"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { MasterTable } from "../../../../../common/interfaces/MasterTable.interface"
import { MasterTableService } from "../../../../../common/services/MasterTableService"
import { ImageModal } from "../../../../../common/components/ImageModal/ImageModal"
import { loopPictures } from "../../../../../common/utils"

interface TicketRegisterCompleteFormTwoInterface {
  ticket: GetTicketById
  onLoadingChange: (loading: boolean) => void
}

const validationSchema = yup.object({
  DeviceOne: yup.string().required("Equipo es obligatorio"),
  SeriesNumberOne: yup.string().required("Número de serie es obligatorio"),
  CounterOne: yup.number().required("Contador es obligatorio"),
  GuideOne: yup.string().required("# Guía es obligatoria"),
  DeviceTwo: yup.string().required("Equipo (R) es obligatorio"),
  SeriesNumberTwo: yup.string().required("Número de serie es obligatorio"),
  CounterTwo: yup.number().required("Contador es obligatorio"),
  GuideTwo: yup.string().required("# Guía es obligatoria"),
  FoundFailure: yup
    .string()
    .required("Falla encontrada es obligatoria")
    .min(10, "Falla encontrada debe tener como mínimo 10 caracteres"),
})

export const TicketRegisterCompleteFormTwo = ({
  ticket,
  onLoadingChange,
}: TicketRegisterCompleteFormTwoInterface) => {
  const [devices, setDevices] = useState<MasterTable[]>([])
  const [ticketFormTwo, setTicketFormTwo] = useState<any>()
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const [pictures, setPictures] = useState<string[]>([])
  const [open, setOpen] = useState(false)
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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  async function getDevices() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.DEVICES
    )
    if (data) {
      setDevices(data)
    }
  }

  async function getAll() {
    await getDevices()
    onLoadingChange(false)
  }

  async function registerTicketStep(isNext: boolean) {
    if (formik.isValid && pictures.length > 0) {
      const requestFormTwo: TicketRegisterStepThreeRequestFormTwo = {
        DeviceOne: formik.values.DeviceOne,
        SeriesNumberOne: formik.values.SeriesNumberOne,
        CounterOne: formik.values.CounterOne,
        GuideOne: formik.values.GuideOne,
        DeviceTwo: formik.values.DeviceTwo,
        SeriesNumberTwo: formik.values.SeriesNumberTwo,
        CounterTwo: formik.values.CounterTwo,
        GuideTwo: formik.values.GuideTwo,
        FoundFailure: formik.values.FoundFailure,
        Pictures: loopPictures(pictures, ConstantFilePurpose.IMAGEN_TECNICO),
      }

      secureLocalStorage.setItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_TWO,
        requestFormTwo
      )

      isNext ? setTicketStep(3) : setTicketStep(1)
    } else {
      handleOpen()
      return
    }
  }

  const formik = useFormik({
    initialValues: {
      DeviceOne: "",
      SeriesNumberOne: "",
      CounterOne: "",
      GuideOne: "",
      DeviceTwo: "",
      SeriesNumberTwo: "",
      CounterTwo: "",
      GuideTwo: "",
      ReportedFailure: "",
      FoundFailure: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  })

  useEffect(() => {
    getAll()
  }, [])

  useEffect(() => {
    onLoadingChange(true)
    setTicketFormTwo(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_TWO
      )
    )
    if (ticket) {
      formik.setValues({
        DeviceOne: ticketFormTwo?.DeviceOne || "",
        SeriesNumberOne: ticketFormTwo?.SeriesNumberOne || "",
        CounterOne: ticketFormTwo?.CounterOne || "",
        GuideOne: ticketFormTwo?.GuideOne || "",
        DeviceTwo: ticketFormTwo?.DeviceTwo || "",
        SeriesNumberTwo: ticketFormTwo?.SeriesNumberTwo || "",
        CounterTwo: ticketFormTwo?.CounterTwo || "",
        GuideTwo: ticketFormTwo?.GuideTwo || "",
        ReportedFailure: ticket.ReportedFailure || "",
        FoundFailure: ticketFormTwo?.FoundFailure || "",
      })
    }
    onLoadingChange(false)
  }, [ticketFormTwo])

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
        <div className="col-span-12 md:col-span-4">
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
        <div className="col-span-12 md:col-span-3">
          <TextField
            color="primary"
            className="w-full"
            id="SeriesNumberOne"
            name="SeriesNumberOne"
            value={formik.values.SeriesNumberOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.SeriesNumberOne &&
              Boolean(formik.errors.SeriesNumberOne)
            }
            helperText={
              formik.touched.SeriesNumberOne && formik.errors.SeriesNumberOne
            }
            label="N/S"
          />
        </div>
        <div className="col-span-12 md:col-span-2">
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
        <div className="col-span-12 md:col-span-3">
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
        <div className="col-span-12 md:col-span-4">
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
        <div className="col-span-12 md:col-span-3">
          <TextField
            color="primary"
            className="w-full"
            id="SeriesNumberTwo"
            name="SeriesNumberTwo"
            value={formik.values.SeriesNumberTwo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.SeriesNumberTwo &&
              Boolean(formik.errors.SeriesNumberTwo)
            }
            helperText={
              formik.touched.SeriesNumberTwo && formik.errors.SeriesNumberTwo
            }
            label="N/S"
          />
        </div>
        <div className="col-span-12 md:col-span-2">
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
        <div className="col-span-12 md:col-span-3">
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
            className={`w-full border-2 border-gray-300 rounded-md ${
              formik.touched.FoundFailure && formik.errors.FoundFailure
                ? "outline-qRed"
                : "focus:outline-qGreen"
            }  p-2`}
            required
            placeholder="Escribir falla encontrada..."
            name="FoundFailure"
            id="FoundFailure"
            rows={3}
            value={formik.values.FoundFailure}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={100}
          ></textarea>
          <div className="flex justify-between">
            {formik.touched.FoundFailure && formik.errors.FoundFailure ? (
              <p className="text-qRed text-sm">{formik.errors.FoundFailure}</p>
            ) : (
              <div></div>
            )}
            <small className="text-right block">
              {formik.values.FoundFailure.length}/100
            </small>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-col md:flex-row md:space-x-2">
            <h3>Evidencia(s)</h3>
            <div className="register_profile_image overflow-hidden">
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
          <div className="flex flex-row flex-wrap space-x-2 mt-4">
            {pictures.map((imgData, index) => (
              <div
                key={index}
                className="w-16 h-16 relative cursor-pointer"
                onClick={() => handleOpenImageModal(imgData)}
              >
                <img
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

      <div className="w-full mt-8 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3 md:justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkerBlue`}
          onClick={() => registerTicketStep(false)}
          type="button"
        >
          Anterior
        </button>
        <button
          className={`px-10 py-2 font-medium rounded-full text-white ${
            formik.isValid
              ? "bg-qGreen hover:bg-qDarkGreen"
              : "bg-qGray cursor-default"
          }`}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Debe adjuntar por lo menos 1 evidencia
        </Alert>
      </Snackbar>
    </>
  )
}
