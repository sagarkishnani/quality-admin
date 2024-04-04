/* eslint-disable react-hooks/exhaustive-deps */
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
  Autocomplete,
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
import { combinarValores, loopPictures } from "../../../../../common/utils"
import { HiX } from "react-icons/hi"

interface TicketRegisterCompleteFormTwoInterface {
  ticket: GetTicketById
  onLoadingChange: (loading: boolean) => void
}

const validationSchema = yup.object({
  DeviceOne: yup.string().required("Equipo es obligatorio"),
  SeriesNumberOne: yup.string().required("Número de serie es obligatorio"),
  // CounterOne: yup.number().required("Contador es obligatorio"),
  // GuideOne: yup.string().required("# Guía es obligatoria"),
  // DeviceTwo: yup.string().required("Equipo (R) es obligatorio"),
  // SeriesNumberTwo: yup.string().required("Número de serie es obligatorio"),
  // CounterTwo: yup.number().required("Contador es obligatorio"),
  // GuideTwo: yup.string().required("# Guía es obligatoria"),
  // PartOne: yup.string().required("Falla encontrada es obligatoria"),
})

export const TicketRegisterCompleteFormTwo = ({
  ticket,
  onLoadingChange,
}: TicketRegisterCompleteFormTwoInterface) => {
  const [devices, setDevices] = useState<MasterTable[]>([])
  const [ticketFormTwo, setTicketFormTwo] = useState<any>()
  const [selectedImg, setSelectedImg] = useState("")
  const [selectedDeviceOne, setSelectedDeviceOne] = useState<MasterTable>()
  const [selectedDeviceTwo, setSelectedDeviceTwo] = useState<MasterTable>()

  const [selectedPart, setSelectedPart] = useState<MasterTable>()
  const [selectedProcedure, setSelectedProcedure] = useState<MasterTable>()
  const [selectedPartTwo, setSelectedPartTwo] = useState<MasterTable>()
  const [selectedProcedureTwo, setSelectedProcedureTwo] =
    useState<MasterTable>()
  const [selectedPartThree, setSelectedPartThree] = useState<MasterTable>()
  const [selectedProcedureThree, setSelectedProcedureThree] =
    useState<MasterTable>()
  const [parts, setParts] = useState<MasterTable[]>([])
  const [procedures, setProcedures] = useState<MasterTable[]>([])
  const [filteredProcedures, setFilteredProcedures] = useState<MasterTable[]>(
    []
  )
  const [filteredProceduresTwo, setFilteredProceduresTwo] = useState<
    MasterTable[]
  >([])
  const [filteredProceduresThree, setFilteredProceduresThree] = useState<
    MasterTable[]
  >([])

  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const [pictures, setPictures] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const { setTicketStep } = useTicket()

  const handlePartChange = (event) => {
    const selectedValue = event.target.value
    const chosenPart = parts.filter(
      (part) => part.IdMasterTable === selectedValue
    )[0]
    setSelectedPart(chosenPart)

    const filteredChildren = procedures.filter(
      (option) => option.Value === selectedValue
    )
    setFilteredProcedures(filteredChildren)
    formik.setFieldValue("PartOne", selectedValue)
  }

  const handleProcedure = (event) => {
    const selectedValue = event.target.value
    const chosenProcedure = procedures.filter(
      (proc) => proc.IdMasterTable === selectedValue
    )[0]
    setSelectedProcedure(chosenProcedure)
    formik.setFieldValue("ProcedureOne", selectedValue)
  }

  const handlePartTwoChange = (event) => {
    const selectedValue = event.target.value
    const chosenPart = parts.filter(
      (part) => part.IdMasterTable === selectedValue
    )[0]
    setSelectedPartTwo(chosenPart)

    const filteredChildren = procedures.filter(
      (option) => option.Value === selectedValue
    )
    setFilteredProceduresTwo(filteredChildren)
    formik.setFieldValue("PartTwo", selectedValue)
  }

  const handleProcedureTwo = (event) => {
    const selectedValue = event.target.value
    const chosenProcedure = procedures.filter(
      (proc) => proc.IdMasterTable === selectedValue
    )[0]
    setSelectedProcedureTwo(chosenProcedure)
    formik.setFieldValue("ProcedureTwo", selectedValue)
  }

  const handlePartThreeChange = (event) => {
    const selectedValue = event.target.value
    const chosenPart = parts.filter(
      (part) => part.IdMasterTable === selectedValue
    )[0]
    setSelectedPartThree(chosenPart)

    const filteredChildren = procedures.filter(
      (option) => option.Value === selectedValue
    )
    setFilteredProceduresThree(filteredChildren)
    formik.setFieldValue("PartThree", selectedValue)
  }

  const handleProcedureThree = (event) => {
    const selectedValue = event.target.value
    const chosenProcedure = procedures.filter(
      (proc) => proc.IdMasterTable === selectedValue
    )[0]
    setSelectedProcedureThree(chosenProcedure)
    formik.setFieldValue("ProcedureThree", selectedValue)
  }

  const handlePart = (
    idMasterTable: string,
    setSelectedPartFunction: React.Dispatch<
      React.SetStateAction<MasterTable | undefined>
    >,
    setFilteredProceduresFunction: React.Dispatch<
      React.SetStateAction<MasterTable[]>
    >,
    setSelectedProcedureFunction: React.Dispatch<
      React.SetStateAction<MasterTable | undefined>
    >,
    idMasterTableProcedure: string
  ) => {
    const chosenPart = parts.find(
      (part) => part.IdMasterTable === idMasterTable
    )
    if (chosenPart) {
      setSelectedPartFunction(chosenPart)

      const filteredChildren = procedures.filter(
        (option) => option.Value === idMasterTable
      )
      setFilteredProceduresFunction(filteredChildren)
      if (filteredChildren) {
        const chosenProcedure = procedures.filter(
          (proc) => proc.IdMasterTable === idMasterTableProcedure
        )[0]

        if (chosenProcedure) {
          setSelectedProcedureFunction(chosenProcedure)
        }
      }
    }
  }

  const handleDeleteImg = (index: number) => {
    const newPictures = [...pictures]
    newPictures.splice(index, 1)
    setPictures(newPictures)
  }

  const setDevice = (
    deviceName: string,
    setSelectedDeviceFunction: React.Dispatch<
      React.SetStateAction<MasterTable | undefined>
    >,
    controlName: string,
    formikSetValueFunction: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const chosenDevice = devices?.filter(
      (device) => device.Name === deviceName
    )[0]
    if (chosenDevice) {
      setSelectedDeviceFunction(chosenDevice)
      formikSetValueFunction(controlName, chosenDevice?.Name)
    }
  }

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

  async function getParts() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.FAILURE_PARTS
    )
    if (data) {
      setParts(data)
    }
  }
  async function getProcedures() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.FAILURES
    )
    if (data) {
      setProcedures(data)
    }
  }

  const handleClearPartOne = () => {
    formik.setValues({
      ...formik.values,
      PartOne: "",
      ProcedureOne: "",
      PartOneLabel: "",
      ProcedureOneLabel: "",
    })
  }

  const handleClearPartTwo = () => {
    formik.setValues({
      ...formik.values,
      PartTwo: "",
      ProcedureTwo: "",
      PartTwoLabel: "",
      ProcedureTwoLabel: "",
    })
  }

  const handleClearPartThree = () => {
    formik.setValues({
      ...formik.values,
      PartThree: "",
      ProcedureThree: "",
      PartThreeLabel: "",
      ProcedureThreeLabel: "",
    })
  }

  async function getAll() {
    await getDevices()
    await getParts()
    await getProcedures()
    onLoadingChange(false)
  }

  async function registerTicketStep(isNext: boolean) {
    if (!isNext) return setTicketStep(1)
    if (formik.isValid && pictures.length > 0) {
      const requestFormTwo: TicketRegisterStepThreeRequestFormTwo = {
        DeviceOne: formik.values.DeviceOne,
        DeviceOneValue: selectedDeviceOne?.Value,
        SeriesNumberOne: formik.values.SeriesNumberOne,
        CounterOne: formik.values.CounterOne,
        GuideOne: formik.values.GuideOne,
        DeviceTwo: formik.values.DeviceTwo,
        DeviceTwoValue: selectedDeviceTwo?.Value,
        SeriesNumberTwo: formik.values.SeriesNumberTwo,
        CounterTwo: formik.values.CounterTwo,
        GuideTwo: formik.values.GuideTwo,
        FoundFailure: combinarValores([
          selectedPart?.Name,
          selectedProcedure?.Name,
          selectedPartTwo?.Name,
          selectedProcedureTwo?.Name,
          selectedPartThree?.Name,
          selectedProcedureThree?.Name,
        ]),
        Pictures: loopPictures(pictures, ConstantFilePurpose.IMAGEN_TECNICO),
        PartOne: selectedPart?.IdMasterTable,
        ProcedureOne: formik.values.ProcedureOne,
        PartOneLabel: selectedPart?.Name,
        ProcedureOneLabel: selectedProcedure?.Name,
        PartTwo: selectedPartTwo?.IdMasterTable,
        ProcedureTwo: formik.values.ProcedureTwo,
        PartTwoLabel: selectedPartTwo?.Name,
        ProcedureTwoLabel: selectedProcedureTwo?.Name,
        PartThree: selectedPartThree?.IdMasterTable,
        ProcedureThree: formik.values.ProcedureThree,
        PartThreeLabel: selectedPartThree?.Name,
        ProcedureThreeLabel: selectedProcedureThree?.Name,
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
      DeviceOneValue: "",
      SeriesNumberOne: "",
      CounterOne: "",
      GuideOne: "",
      DeviceTwo: "",
      DeviceTwoValue: "",
      SeriesNumberTwo: "",
      CounterTwo: "",
      GuideTwo: "",
      ReportedFailure: "",
      FoundFailure: "",
      PartOne: "",
      ProcedureOne: "",
      PartOneLabel: "",
      ProcedureOneLabel: "",
      PartTwo: "",
      ProcedureTwo: "",
      PartTwoLabel: "",
      ProcedureTwoLabel: "",
      PartThree: "",
      ProcedureThree: "",
      PartThreeLabel: "",
      ProcedureThreeLabel: "",
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
        DeviceOneValue: ticketFormTwo?.DeviceOneValue || "",
        SeriesNumberOne: ticketFormTwo?.SeriesNumberOne || "",
        CounterOne: ticketFormTwo?.CounterOne || "",
        GuideOne: ticketFormTwo?.GuideOne || "",
        DeviceTwo: ticketFormTwo?.DeviceTwo || "",
        DeviceTwoValue: ticketFormTwo?.DeviceTwoValue || "",
        SeriesNumberTwo: ticketFormTwo?.SeriesNumberTwo || "",
        CounterTwo: ticketFormTwo?.CounterTwo || "",
        GuideTwo: ticketFormTwo?.GuideTwo || "",
        ReportedFailure: ticket.ReportedFailure || "",
        FoundFailure: ticketFormTwo?.FoundFailure || "",
        PartOne: ticketFormTwo?.PartOne || "",
        ProcedureOne: ticketFormTwo?.ProcedureOne || "",
        PartOneLabel: ticketFormTwo?.PartOneLabel || "",
        ProcedureOneLabel: ticketFormTwo?.ProcedureOneLabel || "",
        PartTwo: ticketFormTwo?.PartTwo || "",
        ProcedureTwo: ticketFormTwo?.ProcedureTwo || "",
        PartTwoLabel: ticketFormTwo?.PartTwoLabel || "",
        ProcedureTwoLabel: ticketFormTwo?.ProcedureTwoLabel || "",
        PartThree: ticketFormTwo?.PartThree || "",
        ProcedureThree: ticketFormTwo?.ProcedureThree || "",
        PartThreeLabel: ticketFormTwo?.PartThreeLabel || "",
        ProcedureThreeLabel: ticketFormTwo?.ProcedureThreeLabel || "",
      })

      if (ticketFormTwo?.DeviceOne !== undefined) {
        setDevice(
          ticketFormTwo?.DeviceOne,
          setSelectedDeviceOne,
          "DeviceOne",
          formik.setFieldValue
        )
      }

      if (ticketFormTwo?.DeviceTwo !== undefined) {
        setDevice(
          ticketFormTwo?.DeviceTwo,
          setSelectedDeviceTwo,
          "DeviceTwo",
          formik.setFieldValue
        )
      }

      handlePart(
        ticketFormTwo?.PartOne,
        setSelectedPart,
        setFilteredProcedures,
        setSelectedProcedure,
        ticketFormTwo?.ProcedureOne
      )
      if (ticketFormTwo?.PartTwo !== undefined) {
        handlePart(
          ticketFormTwo?.PartTwo,
          setSelectedPartTwo,
          setFilteredProceduresTwo,
          setSelectedProcedureTwo,
          ticketFormTwo?.ProcedureTwo
        )
      }

      if (ticketFormTwo?.PartThree !== undefined) {
        handlePart(
          ticketFormTwo?.PartThree,
          setSelectedPartThree,
          setFilteredProceduresThree,
          setSelectedProcedureThree,
          ticketFormTwo?.ProcedureThree
        )
      }

      if (ticketFormTwo?.Pictures.length > 0) {
        const contentOfPics = ticketFormTwo?.Pictures.map((pic) => pic.Content)

        setPictures(contentOfPics)
      }
    }

    onLoadingChange(false)
  }, [ticketFormTwo, parts, procedures, devices])

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
          <Autocomplete
            className="w-full"
            disablePortal
            options={devices}
            onChange={(event, newValue) => {
              setSelectedDeviceOne(newValue)
              formik.setFieldValue("DeviceOne", newValue?.Name || "")
            }}
            value={selectedDeviceOne ? selectedDeviceOne : {}}
            getOptionLabel={(option) => option?.Name || ""}
            renderInput={(params) => (
              <TextField name="DeviceOne" required {...params} label="Equipo" />
            )}
            openText="Mostrar opciones"
            noOptionsText="No hay opciones"
          />
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
          <Autocomplete
            className="w-full"
            disablePortal
            options={devices}
            onChange={(event, newValue) => {
              setSelectedDeviceTwo(newValue)
              formik.setFieldValue("DeviceTwo", newValue?.Name)
            }}
            value={selectedDeviceTwo ? selectedDeviceTwo : {}}
            getOptionLabel={(option) => option?.Name || ""}
            renderInput={(params) => (
              <TextField name="DeviceTwo" {...params} label="Equipo (R)" />
            )}
            openText="Mostrar opciones"
            noOptionsText="No hay opciones"
          />
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
        </div>
        <div className="col-span-12 md:col-span-6">
          <FormControl fullWidth>
            <InputLabel id="PartOne">Parte Uno</InputLabel>
            <Select
              labelId="PartOneLabel"
              id="PartOne"
              name="PartOne"
              value={formik.values.PartOne}
              onChange={handlePartChange}
            >
              {parts.map((part) => (
                <MenuItem key={part.IdMasterTable} value={part.IdMasterTable}>
                  {part.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-11 md:col-span-5">
          <FormControl fullWidth>
            <InputLabel id="ProcedureOne">Falla Uno</InputLabel>
            <Select
              labelId="ProcedureOneLabel"
              id="ProcedureOne"
              name="ProcedureOne"
              value={formik.values.ProcedureOne}
              onChange={handleProcedure}
              disabled={!selectedPart}
            >
              {filteredProcedures.map((procedure) => (
                <MenuItem
                  key={procedure.IdMasterTable}
                  value={procedure.IdMasterTable}
                >
                  {procedure.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-1 md:col-span-1 flex justify-center items-center">
          <button
            onClick={handleClearPartOne}
            className="transition duration-300 hover:scale-110"
          >
            <HiX color="#00A0DF" size={"25"} />
          </button>
        </div>
        <div className="col-span-12 md:col-span-6">
          <FormControl fullWidth>
            <InputLabel id="PartTwo">Parte Dos</InputLabel>
            <Select
              labelId="PartTwoLabel"
              id="PartTwo"
              name="PartTwo"
              value={formik.values.PartTwo}
              onChange={handlePartTwoChange}
            >
              {parts.map((part) => (
                <MenuItem key={part.IdMasterTable} value={part.IdMasterTable}>
                  {part.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-11 md:col-span-5">
          <FormControl fullWidth>
            <InputLabel id="ProcedureTwo">Falla Dos</InputLabel>
            <Select
              labelId="ProcedureTwoLabel"
              id="ProcedureTwo"
              name="ProcedureTwo"
              value={formik.values.ProcedureTwo}
              onChange={handleProcedureTwo}
              disabled={!selectedPartTwo}
            >
              {filteredProceduresTwo.map((procedure) => (
                <MenuItem
                  key={procedure.IdMasterTable}
                  value={procedure.IdMasterTable}
                >
                  {procedure.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-1 md:col-span-1 flex justify-center items-center">
          <button
            className="transition duration-300 hover:scale-110"
            onClick={handleClearPartTwo}
          >
            <HiX color="#00A0DF" size={"25"} />
          </button>
        </div>
        <div className="col-span-12 md:col-span-6">
          <FormControl fullWidth>
            <InputLabel id="PartThree">Parte Tres</InputLabel>
            <Select
              labelId="PartThreeLabel"
              id="PartThree"
              name="PartThree"
              value={formik.values.PartThree}
              onChange={handlePartThreeChange}
            >
              {parts.map((part) => (
                <MenuItem key={part.IdMasterTable} value={part.IdMasterTable}>
                  {part.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-11 md:col-span-5">
          <FormControl fullWidth>
            <InputLabel id="ProcedureThree">Falla Tres</InputLabel>
            <Select
              labelId="ProcedureThreeLabel"
              id="ProcedureThree"
              name="ProcedureThree"
              value={formik.values.ProcedureThree}
              onChange={handleProcedureThree}
              disabled={!selectedPartThree}
            >
              {filteredProceduresThree.map((procedure) => (
                <MenuItem
                  key={procedure.IdMasterTable}
                  value={procedure.IdMasterTable}
                >
                  {procedure.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-1 md:col-span-1 flex justify-center items-center">
          <button
            onClick={handleClearPartThree}
            className="transition duration-300 hover:scale-110"
          >
            <HiX color="#00A0DF" size={"25"} />
          </button>
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
              <div key={index} className="w-16 h-16 relative cursor-pointer">
                <button
                  onClick={() => handleDeleteImg(index)}
                  className="w-6 h-6 absolute right-0 -top-4 rounded-full bg-qBlue font-semibold text-white z-40"
                >
                  X
                </button>
                <img
                  className="h-full w-full object-fill rounded-md absolute hover:opacity-60"
                  onClick={() => handleOpenImageModal(imgData)}
                  src={imgData}
                />
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
