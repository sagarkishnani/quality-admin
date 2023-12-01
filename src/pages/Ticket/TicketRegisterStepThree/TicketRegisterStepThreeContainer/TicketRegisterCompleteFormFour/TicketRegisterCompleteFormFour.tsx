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
  TicketRegisterStepThreeRequestFormFour,
} from "../../../../../common/interfaces/Ticket.interface"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { TicketService } from "../../../../../common/services/TicketService"
import {
  Alert,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from "@mui/material"
import moment from "moment"
import { TimePicker } from "@mui/x-date-pickers"
import { HiChevronRight, HiChevronDown } from "react-icons/hi"
import { useTicket } from "../../../../../common/contexts/TicketContext"
import { MasterTable } from "../../../../../common/interfaces/MasterTable.interface"
import { MasterTableService } from "../../../../../common/services/MasterTableService"

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

export const TicketRegisterCompleteFormFour = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [devices, setDevices] = useState<MasterTable[]>([])
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const [ticketFormFour, setTicketFormFour] = useState<any>()
  const { setTicketStep } = useTicket()
  const [isCollapsedCambio, setIsCollapsedCambio] = useState(true)
  const [isCollapsedMantenimiento, setIsCollapsedMantenimiento] = useState(true)
  const [isCollapsedRevision, setIsCollapsedRevision] = useState(true)

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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  function registerTicketStep(isNext: boolean) {
    debugger
    const isFormValid = Object.values(formik.values).some(
      (value) => value !== false
    )

    if (isFormValid) {
      const requestFormFour: TicketRegisterStepThreeRequestFormFour = {
        Instalacion: formik.values.Instalacion,
        Retiro: formik.values.Retiro,
        Reparacion: formik.values.Reparacion,
        ActualFirmware: formik.values.ActualFirmware,
        EtiquetaFusor: formik.values.EtiquetaFusor,
        EtiquetaFusorTeflon: formik.values.EtiquetaFusorTeflon,
        CambioCartucho: formik.values.CambioCartucho,
        CambioFusor: formik.values.CambioFusor,
        CambioImagen: formik.values.CambioImagen,
        CambioRodillo: formik.values.CambioRodillo,
        CambioTeflon: formik.values.CambioTeflon,
        CambioRodilloBUno: formik.values.CambioRodilloBUno,
        CambioRodilloBDos: formik.values.CambioRodilloBDos,
        CambioSeparador: formik.values.CambioSeparador,
        CambioDrive: formik.values.CambioDrive,
        CambioSwing: formik.values.CambioSwing,
        CambioAOF: formik.values.CambioAOF,
        CambioDC: formik.values.CambioDC,
        MantImpresora: formik.values.MantImpresora,
        MantOptico: formik.values.MantOptico,
        MantOpticoEscaner: formik.values.MantOpticoEscaner,
        MantSistema: formik.values.MantSistema,
        RevCartucho: formik.values.RevCartucho,
        RevFusor: formik.values.RevFusor,
        RevImagen: formik.values.RevImagen,
        RevADF: formik.values.RevADF,
        RevRodilloBUno: formik.values.RevRodilloBUno,
        RevRodilloBDos: formik.values.RevRodilloBDos,
        RevSeparador: formik.values.RevSeparador,
        RevDuplex: formik.values.RevDuplex,
      }

      secureLocalStorage.setItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_FOUR,
        requestFormFour
      )

      isNext ? setTicketStep(5) : setTicketStep(3)
    } else {
      setOpen(true)
    }
  }

  const formik = useFormik({
    initialValues: {
      Instalacion: false,
      Retiro: false,
      Reparacion: false,
      ActualFirmware: false,
      EtiquetaFusor: false,
      EtiquetaFusorTeflon: false,
      Cambio: false,
      CambioCartucho: false,
      CambioFusor: false,
      CambioImagen: false,
      CambioRodillo: false,
      CambioTeflon: false,
      CambioRodilloBUno: false,
      CambioRodilloBDos: false,
      CambioSeparador: false,
      CambioDrive: false,
      CambioSwing: false,
      CambioAOF: false,
      CambioDC: false,
      Mantenimiento: false,
      MantImpresora: false,
      MantOptico: false,
      MantOpticoEscaner: false,
      MantSistema: false,
      Revision: false,
      RevCartucho: false,
      RevFusor: false,
      RevImagen: false,
      RevADF: false,
      RevRodilloBUno: false,
      RevRodilloBDos: false,
      RevSeparador: false,
      RevDuplex: false,
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

  const handleCambioChange = (isChecked) => {
    formik.setFieldValue("CambioCartucho", isChecked)
    formik.setFieldValue("CambioFusor", isChecked)
  }

  const handleMantenimientoChange = (isChecked) => {
    // formik.setFieldValue("CambioCartucho", isChecked)
    // formik.setFieldValue("CambioFusor", isChecked)
  }

  const handleRevisionChange = (isChecked) => {
    // formik.setFieldValue("CambioCartucho", isChecked)
    // formik.setFieldValue("CambioFusor", isChecked)
  }

  useEffect(() => {
    setTicketFormFour(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_FOUR
      )
    )
    if (ticket) {
      formik.setValues({
        Instalacion: ticketFormFour?.Instalacion || false,
        Retiro: ticketFormFour?.Retiro || false,
        Reparacion: ticketFormFour?.Reparacion || false,
        ActualFirmware: ticketFormFour?.ActualFirmware || false,
        EtiquetaFusor: ticketFormFour?.EtiquetaFusor || false,
        EtiquetaFusorTeflon: ticketFormFour?.EtiquetaFusorTeflon || false,
        Cambio: ticketFormFour?.Cambio || false,
        CambioCartucho: ticketFormFour?.CambioCartucho || false,
        CambioFusor: ticketFormFour?.CambioFusor || false,
        CambioImagen: ticketFormFour?.CambioImagen || false,
        CambioRodillo: ticketFormFour?.CambioRodillo || false,
        CambioTeflon: ticketFormFour?.CambioTeflon || false,
        CambioRodilloBUno: ticketFormFour?.CambioRodilloBUno || false,
        CambioRodilloBDos: ticketFormFour?.CambioRodilloBDos || false,
        CambioSeparador: ticketFormFour?.CambioSeparador || false,
        CambioDrive: ticketFormFour?.CambioDrive || false,
        CambioSwing: ticketFormFour?.CambioSwing || false,
        CambioAOF: ticketFormFour?.CambioAOF || false,
        CambioDC: ticketFormFour?.CambioDC || false,
        Mantenimiento: ticketFormFour?.Mantenimiento || false,
        MantImpresora: ticketFormFour?.MantImpresora || false,
        MantOptico: ticketFormFour?.MantOptico || false,
        MantOpticoEscaner: ticketFormFour?.MantOpticoEscaner || false,
        MantSistema: ticketFormFour?.MantSistema || false,
        Revision: ticketFormFour?.Revision || false,
        RevCartucho: ticketFormFour?.RevCartucho || false,
        RevFusor: ticketFormFour?.RevFusor || false,
        RevImagen: ticketFormFour?.RevImagen || false,
        RevADF: ticketFormFour?.RevADF || false,
        RevRodilloBUno: ticketFormFour?.RevRodilloBUno || false,
        RevRodilloBDos: ticketFormFour?.RevRodilloBDos || false,
        RevSeparador: ticketFormFour?.RevSeparador || false,
        RevDuplex: ticketFormFour?.RevDuplex || false,
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
        <div className="col-span-12">
          <h4 className="font-semibold text-lg">Procedimiento</h4>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                onChange={() =>
                  formik.setFieldValue(
                    "Instalacion",
                    !formik.values.Instalacion
                  )
                }
                control={<Checkbox />}
                label="Instalación"
              />
            </div>
            <div>
              <FormControlLabel
                onChange={() =>
                  formik.setFieldValue("Retiro", !formik.values.Retiro)
                }
                control={<Checkbox />}
                label="Retiro"
              />
            </div>
            <div>
              <FormControlLabel
                onChange={() =>
                  formik.setFieldValue("Reparacion", !formik.values.Reparacion)
                }
                control={<Checkbox />}
                label="Reparación"
              />
            </div>
            <div>
              <FormControlLabel
                onChange={() =>
                  formik.setFieldValue(
                    "ActualFirmware",
                    !formik.values.ActualFirmware
                  )
                }
                control={<Checkbox />}
                label="Actual Firmware"
              />
            </div>
            <div>
              <FormControlLabel
                onChange={() =>
                  formik.setFieldValue(
                    "EtiquetaFusor",
                    !formik.values.EtiquetaFusor
                  )
                }
                control={<Checkbox />}
                label="Etiqueta en fusor"
              />
            </div>
            <div>
              <FormControlLabel
                onChange={() =>
                  formik.setFieldValue(
                    "EtiquetaFusorTeflon",
                    !formik.values.EtiquetaFusorTeflon
                  )
                }
                control={<Checkbox />}
                label="Etiqueta en fusor - teflón"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-row items-center space-x-2">
            <div
              onClick={() => setIsCollapsedCambio(!isCollapsedCambio)}
              className="cursor-pointer"
            >
              {isCollapsedCambio && <HiChevronRight size={"20"} />}
              {!isCollapsedCambio && <HiChevronDown size={"20"} />}
            </div>
            <div>
              <FormControlLabel
                label="Cambio"
                control={
                  <Checkbox
                    id="Cambio"
                    name="Cambio"
                    checked={
                      formik.values.CambioCartucho && formik.values.CambioFusor
                    }
                    indeterminate={
                      formik.values.CambioCartucho !==
                        formik.values.CambioFusor &&
                      (formik.values.CambioCartucho ||
                        formik.values.CambioFusor)
                    }
                    onChange={(e) => handleCambioChange(e.target.checked)}
                  />
                }
              />
            </div>
          </div>
          <Collapse in={!isCollapsedCambio}>
            <div className="flex flex-col ml-10">
              <FormControlLabel
                label="Cambio de cartucho"
                control={
                  <Checkbox
                    id="CambioCartucho"
                    name="CambioCartucho"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioCartucho",
                        !formik.values.CambioCartucho
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio de fusor"
                control={
                  <Checkbox
                    id="CambioFusor"
                    name="CambioFusor"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioFusor",
                        !formik.values.CambioFusor
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio de U imagen"
                control={
                  <Checkbox
                    id="CambioImagen"
                    name="CambioImagen"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioImagen",
                        !formik.values.CambioImagen
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio de rodillo"
                control={
                  <Checkbox
                    id="CambioRodillo"
                    name="CambioRodillo"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioRodillo",
                        !formik.values.CambioRodillo
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio de teflón"
                control={
                  <Checkbox
                    id="CambioTeflon"
                    name="CambioTeflon"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioTeflon",
                        !formik.values.CambioTeflon
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio rodillo B1/B3"
                control={
                  <Checkbox
                    id="CambioRodilloBUno"
                    name="CambioRodilloBUno"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioRodilloBUno",
                        !formik.values.CambioRodilloBUno
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio rodillo B2/B4"
                control={
                  <Checkbox
                    id="CambioRodilloBDos"
                    name="CambioRodilloBDos"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioRodilloBDos",
                        !formik.values.CambioRodilloBDos
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio separador"
                control={
                  <Checkbox
                    id="CambioSeparador"
                    name="CambioSeparador"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioSeparador",
                        !formik.values.CambioSeparador
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio drive assembly"
                control={
                  <Checkbox
                    id="CambioDrive"
                    name="CambioDrive"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioDrive",
                        !formik.values.CambioDrive
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio de swing place"
                control={
                  <Checkbox
                    id="CambioSwing"
                    name="CambioSwing"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioSwing",
                        !formik.values.CambioSwing
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio de AOF"
                control={
                  <Checkbox
                    id="CambioAOF"
                    name="CambioAOF"
                    onChange={() =>
                      formik.setFieldValue(
                        "CambioAOF",
                        !formik.values.CambioAOF
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Cambio DC"
                control={
                  <Checkbox
                    id="CambioDC"
                    name="CambioDC"
                    onChange={() =>
                      formik.setFieldValue("CambioDC", !formik.values.CambioDC)
                    }
                  />
                }
              />
            </div>
          </Collapse>
        </div>
        <div className="col-span-3">
          <div className="flex flex-row items-center space-x-2">
            <div
              onClick={() =>
                setIsCollapsedMantenimiento(!isCollapsedMantenimiento)
              }
              className="cursor-pointer"
            >
              {isCollapsedMantenimiento && <HiChevronRight size={"20"} />}
              {!isCollapsedMantenimiento && <HiChevronDown size={"20"} />}
            </div>
            <div>
              <FormControlLabel
                label="Mantenimiento"
                control={
                  <Checkbox
                    id="Mantenimiento"
                    name="Mantenimiento"
                    checked={
                      formik.values.MantImpresora &&
                      formik.values.MantOptico &&
                      formik.values.MantOpticoEscaner &&
                      formik.values.MantSistema
                    }
                    indeterminate={
                      formik.values.MantImpresora !==
                        formik.values.MantOptico &&
                      (formik.values.MantImpresora ||
                        formik.values.MantOptico ||
                        formik.values.MantOpticoEscaner ||
                        formik.values.MantSistema)
                    }
                    onChange={(e) =>
                      handleMantenimientoChange(e.target.checked)
                    }
                  />
                }
              />
            </div>
          </div>
          <Collapse in={!isCollapsedMantenimiento}>
            <div className="flex flex-col ml-10">
              <FormControlLabel
                label="Mant. Impresora"
                control={
                  <Checkbox
                    id="MantImpresora"
                    name="MantImpresora"
                    onChange={() =>
                      formik.setFieldValue(
                        "MantImpresora",
                        !formik.values.MantImpresora
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Mant. Óptico Impresora"
                control={
                  <Checkbox
                    id="MantOptico"
                    name="MantOptico"
                    onChange={() =>
                      formik.setFieldValue(
                        "MantOptico",
                        !formik.values.MantOptico
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Mant. Óptico Escáner"
                control={
                  <Checkbox
                    id="MantOpticoEscaner"
                    name="MantOpticoEscaner"
                    onChange={() =>
                      formik.setFieldValue(
                        "MantOpticoEscaner",
                        !formik.values.MantOpticoEscaner
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="Mant. Sistema ADF"
                control={
                  <Checkbox
                    id="MantSistema"
                    name="MantSistema"
                    onChange={() =>
                      formik.setFieldValue(
                        "MantSistema",
                        !formik.values.MantSistema
                      )
                    }
                  />
                }
              />
            </div>
          </Collapse>
        </div>
        <div className="col-span-3">
          <div className="flex flex-row items-center space-x-2">
            <div
              onClick={() => setIsCollapsedRevision(!isCollapsedRevision)}
              className="cursor-pointer"
            >
              {isCollapsedRevision && <HiChevronRight size={"20"} />}
              {!isCollapsedRevision && <HiChevronDown size={"20"} />}
            </div>
            <div>
              <FormControlLabel
                label="Revisión"
                control={
                  <Checkbox
                    id="Revision"
                    name="Revision"
                    checked={
                      formik.values.RevCartucho &&
                      formik.values.RevADF &&
                      formik.values.RevDuplex &&
                      formik.values.RevFusor &&
                      formik.values.RevImagen &&
                      formik.values.RevRodilloBDos &&
                      formik.values.RevRodilloBUno &&
                      formik.values.RevSeparador
                    }
                    indeterminate={
                      formik.values.RevCartucho !== formik.values.RevADF &&
                      (formik.values.RevCartucho ||
                        formik.values.RevADF ||
                        formik.values.RevDuplex ||
                        formik.values.RevFusor ||
                        formik.values.RevImagen ||
                        formik.values.RevRodilloBDos ||
                        formik.values.RevRodilloBUno ||
                        formik.values.RevSeparador)
                    }
                    onChange={(e) => handleRevisionChange(e.target.checked)}
                  />
                }
              />
            </div>
          </div>
          <Collapse in={!isCollapsedRevision}>
            <div className="flex flex-col ml-10">
              <FormControlLabel
                label="REV/MANT Cartucho"
                control={
                  <Checkbox
                    id="RevCartucho"
                    name="RevCartucho"
                    onChange={() =>
                      formik.setFieldValue(
                        "RevCartucho",
                        !formik.values.RevCartucho
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Fusor"
                control={
                  <Checkbox
                    id="RevFusor"
                    name="RevFusor"
                    onChange={() =>
                      formik.setFieldValue("RevFusor", !formik.values.RevFusor)
                    }
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT U Imagen"
                control={
                  <Checkbox
                    id="RevImagen"
                    name="RevImagen"
                    onChange={() =>
                      formik.setFieldValue(
                        "RevImagen",
                        !formik.values.RevImagen
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT ADF"
                control={
                  <Checkbox
                    id="RevADF"
                    name="RevADF"
                    onChange={() =>
                      formik.setFieldValue("RevADF", !formik.values.RevADF)
                    }
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Rodillo B1 / B3"
                control={
                  <Checkbox
                    id="RevRodilloBUno"
                    name="RevRodilloBUno"
                    onChange={() =>
                      formik.setFieldValue(
                        "RevRodilloBUno",
                        !formik.values.RevRodilloBUno
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Rodillo B2 / B4"
                control={
                  <Checkbox
                    id="RevRodilloBDos"
                    name="RevRodilloBDos"
                    onChange={() =>
                      formik.setFieldValue(
                        "RevRodilloBDos",
                        !formik.values.RevRodilloBDos
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Separador"
                control={
                  <Checkbox
                    id="RevSeparador"
                    name="RevSeparador"
                    onChange={() =>
                      formik.setFieldValue(
                        "RevSeparador",
                        !formik.values.RevSeparador
                      )
                    }
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT U. Dúplex"
                control={
                  <Checkbox
                    id="RevDuplex"
                    name="RevDuplex"
                    onChange={() =>
                      formik.setFieldValue(
                        "RevDuplex",
                        !formik.values.RevDuplex
                      )
                    }
                  />
                }
              />
            </div>
          </Collapse>
        </div>
      </div>

      <div className="w-full mt-16 flex space-x-3 justify-end">
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Debe seleccionar por lo menos una opción
        </Alert>
      </Snackbar>
    </>
  )
}
