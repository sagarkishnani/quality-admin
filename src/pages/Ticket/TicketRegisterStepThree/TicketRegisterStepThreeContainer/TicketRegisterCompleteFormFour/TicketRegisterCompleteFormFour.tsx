import { useEffect, useState } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import { ConstantLocalStorage } from "../../../../../common/constants"
import { useFormik } from "formik"
import {
  GetTicketById,
  TicketRegisterStepThreeRequestFormFour,
} from "../../../../../common/interfaces/Ticket.interface"
import { TicketService } from "../../../../../common/services/TicketService"
import {
  Alert,
  Checkbox,
  Collapse,
  FormControlLabel,
  Snackbar,
} from "@mui/material"
import moment from "moment"
import { HiChevronRight, HiChevronDown } from "react-icons/hi"
import { useTicket } from "../../../../../common/contexts/TicketContext"

const validationSchema = yup.object({})

export const TicketRegisterCompleteFormFour = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [open, setOpen] = useState(false)
  const [ticketFormFour, setTicketFormFour] = useState<any>()
  const { setTicketStep } = useTicket()
  const [isCollapsedCambio, setIsCollapsedCambio] = useState(true)
  const [isCollapsedMantenimiento, setIsCollapsedMantenimiento] = useState(true)
  const [isCollapsedRevision, setIsCollapsedRevision] = useState(true)
  const [checkboxCambioState, setCheckboxCambioState] = useState({
    checked: false,
    indeterminate: false,
  })
  const [checkboxMantState, setCheckboxMantState] = useState({
    checked: false,
    indeterminate: false,
  })
  const [checkboxRevState, setCheckboxRevState] = useState({
    checked: false,
    indeterminate: false,
  })

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
    }
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
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
    if (!isNext) return setTicketStep(3)
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
        Cambio: formik.values.Cambio,
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
        Mantenimiento: formik.values.Mantenimiento,
        MantImpresora: formik.values.MantImpresora,
        MantOptico: formik.values.MantOptico,
        MantOpticoEscaner: formik.values.MantOpticoEscaner,
        MantSistema: formik.values.MantSistema,
        Revision: formik.values.Revision,
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

  //Handle cambio
  const updateCambioCheckboxState = () => {
    const checkboxCambioValues = [
      formik.values.CambioCartucho,
      formik.values.CambioFusor,
      formik.values.CambioImagen,
      formik.values.CambioRodillo,
      formik.values.CambioTeflon,
      formik.values.CambioRodilloBUno,
      formik.values.CambioRodilloBDos,
      formik.values.CambioSeparador,
      formik.values.CambioDrive,
      formik.values.CambioSwing,
      formik.values.CambioAOF,
      formik.values.CambioDC,
    ]

    const isChecked = checkboxCambioValues.every((value) => value === true)
    const isIndeterminate =
      checkboxCambioValues.some((value) => value !== true) &&
      !checkboxCambioValues.every((value) => value === false)

    setCheckboxCambioState({
      checked: isChecked,
      indeterminate: isIndeterminate,
    })
  }

  const handleCambioChange = (isChecked: boolean) => {
    ;(formik.values.CambioCartucho = isChecked),
      (formik.values.CambioFusor = isChecked),
      (formik.values.CambioImagen = isChecked),
      (formik.values.CambioRodillo = isChecked),
      (formik.values.CambioTeflon = isChecked),
      (formik.values.CambioRodilloBUno = isChecked),
      (formik.values.CambioRodilloBDos = isChecked),
      (formik.values.CambioSeparador = isChecked),
      (formik.values.CambioDrive = isChecked),
      (formik.values.CambioSwing = isChecked),
      (formik.values.CambioAOF = isChecked),
      (formik.values.CambioDC = isChecked),
      updateCambioCheckboxState()
  }

  const handleCambioCartuchoChange = (isChecked: boolean) => {
    formik.values.CambioCartucho = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioFusorChange = (isChecked: boolean) => {
    formik.values.CambioFusor = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioImagen = (isChecked: boolean) => {
    formik.values.CambioImagen = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioRodillo = (isChecked: boolean) => {
    formik.values.CambioRodillo = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioTeflon = (isChecked: boolean) => {
    formik.values.CambioTeflon = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioRodilloBUno = (isChecked: boolean) => {
    formik.values.CambioRodilloBUno = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioRodilloBDos = (isChecked: boolean) => {
    formik.values.CambioRodilloBDos = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioSeparador = (isChecked: boolean) => {
    formik.values.CambioSeparador = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioCambioDrive = (isChecked: boolean) => {
    formik.values.CambioDrive = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioSwing = (isChecked: boolean) => {
    formik.values.CambioSwing = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioAOF = (isChecked: boolean) => {
    formik.values.CambioAOF = isChecked
    updateCambioCheckboxState()
  }

  const handleCambioDC = (isChecked: boolean) => {
    formik.values.CambioDC = isChecked
    updateCambioCheckboxState()
  }

  //Handle Mantenimiento
  const updateMantCheckboxState = () => {
    const checkboxMantValues = [
      formik.values.MantImpresora,
      formik.values.MantOptico,
      formik.values.MantOpticoEscaner,
      formik.values.MantSistema,
    ]

    const isChecked = checkboxMantValues.every((value) => value === true)
    const isIndeterminate =
      checkboxMantValues.some((value) => value !== true) &&
      !checkboxMantValues.every((value) => value === false)

    setCheckboxMantState({
      checked: isChecked,
      indeterminate: isIndeterminate,
    })
  }

  const handleMantChange = (isChecked: boolean) => {
    formik.values.MantImpresora = isChecked
    formik.values.MantOptico = isChecked
    formik.values.MantOpticoEscaner = isChecked
    formik.values.MantSistema = isChecked
    updateMantCheckboxState()
  }

  const handleMantImpresoraChange = (isChecked: boolean) => {
    formik.values.MantImpresora = isChecked
    updateMantCheckboxState()
  }

  const handleMantOpticoChange = (isChecked: boolean) => {
    formik.values.MantOptico = isChecked
    updateMantCheckboxState()
  }

  const handleMantOpticoEscanerChange = (isChecked: boolean) => {
    formik.values.MantOpticoEscaner = isChecked
    updateMantCheckboxState()
  }

  const handleMantSistemaChange = (isChecked: boolean) => {
    formik.values.MantSistema = isChecked
    updateMantCheckboxState()
  }

  //Handle Revisión
  const updateRevCheckboxState = () => {
    const checkboxRevValues = [
      formik.values.RevCartucho,
      formik.values.RevFusor,
      formik.values.RevImagen,
      formik.values.RevADF,
      formik.values.RevRodilloBUno,
      formik.values.RevRodilloBDos,
      formik.values.RevSeparador,
      formik.values.RevDuplex,
    ]

    const isChecked = checkboxRevValues.every((value) => value === true)
    const isIndeterminate =
      checkboxRevValues.some((value) => value !== true) &&
      !checkboxRevValues.every((value) => value === false)

    setCheckboxRevState({
      checked: isChecked,
      indeterminate: isIndeterminate,
    })
  }

  const handleRevChange = (isChecked: boolean) => {
    formik.values.RevCartucho = isChecked
    formik.values.RevFusor = isChecked
    formik.values.RevImagen = isChecked
    formik.values.RevADF = isChecked
    formik.values.RevRodilloBUno = isChecked
    formik.values.RevRodilloBDos = isChecked
    formik.values.RevSeparador = isChecked
    formik.values.RevDuplex = isChecked
    updateRevCheckboxState()
  }

  const handleRevCartuchoChange = (isChecked: boolean) => {
    formik.values.RevCartucho = isChecked
    updateRevCheckboxState()
  }

  const handleRevFusorChange = (isChecked: boolean) => {
    formik.values.RevFusor = isChecked
    updateRevCheckboxState()
  }

  const handleRevImagenChange = (isChecked: boolean) => {
    formik.values.RevImagen = isChecked
    updateRevCheckboxState()
  }

  const handleRevADFChange = (isChecked: boolean) => {
    formik.values.RevADF = isChecked
    updateRevCheckboxState()
  }

  const handleRevRodilloBUnoChange = (isChecked: boolean) => {
    formik.values.RevRodilloBUno = isChecked
    updateRevCheckboxState()
  }

  const handleRevRodilloBDosChange = (isChecked: boolean) => {
    formik.values.RevRodilloBDos = isChecked
    updateRevCheckboxState()
  }

  const handleRevSeparadorChange = (isChecked: boolean) => {
    formik.values.RevSeparador = isChecked
    updateRevCheckboxState()
  }

  const handleRevDuplexChange = (isChecked: boolean) => {
    formik.values.RevDuplex = isChecked
    updateRevCheckboxState()
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
          <h4 className="font-semibold text-lg">Procedimiento</h4>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                checked={formik.values.Instalacion}
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
                checked={formik.values.Retiro}
                onChange={() =>
                  formik.setFieldValue("Retiro", !formik.values.Retiro)
                }
                control={<Checkbox />}
                label="Retiro"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.Reparacion}
                onChange={() =>
                  formik.setFieldValue("Reparacion", !formik.values.Reparacion)
                }
                control={<Checkbox />}
                label="Reparación"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.ActualFirmware}
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
                checked={formik.values.EtiquetaFusor}
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
                checked={formik.values.EtiquetaFusorTeflon}
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
        <div className="col-span-12 md:col-span-3">
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
                    checked={checkboxCambioState.checked}
                    indeterminate={checkboxCambioState.indeterminate}
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
                    checked={formik.values.CambioCartucho}
                    onChange={(e) =>
                      handleCambioCartuchoChange(e.target.checked)
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
                    checked={formik.values.CambioFusor}
                    onChange={(e) => handleCambioFusorChange(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio de U imagen"
                control={
                  <Checkbox
                    id="CambioImagen"
                    name="CambioImagen"
                    checked={formik.values.CambioImagen}
                    onChange={(e) => handleCambioImagen(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio de rodillo"
                control={
                  <Checkbox
                    id="CambioRodillo"
                    name="CambioRodillo"
                    checked={formik.values.CambioRodillo}
                    onChange={(e) => handleCambioRodillo(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio de teflón"
                control={
                  <Checkbox
                    id="CambioTeflon"
                    name="CambioTeflon"
                    checked={formik.values.CambioTeflon}
                    onChange={(e) => handleCambioTeflon(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio rodillo B1/B3"
                control={
                  <Checkbox
                    id="CambioRodilloBUno"
                    name="CambioRodilloBUno"
                    checked={formik.values.CambioRodilloBUno}
                    onChange={(e) => handleCambioRodilloBUno(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio rodillo B2/B4"
                control={
                  <Checkbox
                    id="CambioRodilloBDos"
                    name="CambioRodilloBDos"
                    checked={formik.values.CambioRodilloBDos}
                    onChange={(e) => handleCambioRodilloBDos(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio separador"
                control={
                  <Checkbox
                    id="CambioSeparador"
                    name="CambioSeparador"
                    checked={formik.values.CambioSeparador}
                    onChange={(e) => handleCambioSeparador(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio drive assembly"
                control={
                  <Checkbox
                    id="CambioDrive"
                    name="CambioDrive"
                    checked={formik.values.CambioDrive}
                    onChange={(e) => handleCambioCambioDrive(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio de swing place"
                control={
                  <Checkbox
                    id="CambioSwing"
                    name="CambioSwing"
                    checked={formik.values.CambioSwing}
                    onChange={(e) => handleCambioSwing(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio de AOF"
                control={
                  <Checkbox
                    id="CambioAOF"
                    name="CambioAOF"
                    checked={formik.values.CambioAOF}
                    onChange={(e) => handleCambioAOF(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Cambio DC"
                control={
                  <Checkbox
                    id="CambioDC"
                    name="CambioDC"
                    checked={formik.values.CambioDC}
                    onChange={(e) => handleCambioDC(e.target.checked)}
                  />
                }
              />
            </div>
          </Collapse>
        </div>
        <div className="col-span-12 md:col-span-3">
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
                    checked={checkboxMantState.checked}
                    indeterminate={checkboxMantState.indeterminate}
                    onChange={(e) => handleMantChange(e.target.checked)}
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
                    checked={formik.values.MantImpresora}
                    onChange={(e) =>
                      handleMantImpresoraChange(e.target.checked)
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
                    checked={formik.values.MantOptico}
                    onChange={(e) => handleMantOpticoChange(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Mant. Óptico Escáner"
                control={
                  <Checkbox
                    id="MantOpticoEscaner"
                    name="MantOpticoEscaner"
                    checked={formik.values.MantOpticoEscaner}
                    onChange={(e) =>
                      handleMantOpticoEscanerChange(e.target.checked)
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
                    checked={formik.values.MantSistema}
                    onChange={(e) => handleMantSistemaChange(e.target.checked)}
                  />
                }
              />
            </div>
          </Collapse>
        </div>
        <div className="col-span-12 md:col-span-3">
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
                    checked={checkboxRevState.checked}
                    indeterminate={checkboxRevState.indeterminate}
                    onChange={(e) => handleRevChange(e.target.checked)}
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
                    checked={formik.values.RevCartucho}
                    onChange={(e) => handleRevCartuchoChange(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Fusor"
                control={
                  <Checkbox
                    id="RevFusor"
                    name="RevFusor"
                    checked={formik.values.RevFusor}
                    onChange={(e) => handleRevFusorChange(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT U Imagen"
                control={
                  <Checkbox
                    id="RevImagen"
                    name="RevImagen"
                    checked={formik.values.RevImagen}
                    onChange={(e) => handleRevImagenChange(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT ADF"
                control={
                  <Checkbox
                    id="RevADF"
                    name="RevADF"
                    checked={formik.values.RevADF}
                    onChange={(e) => handleRevADFChange(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Rodillo B1 / B3"
                control={
                  <Checkbox
                    id="RevRodilloBUno"
                    name="RevRodilloBUno"
                    checked={formik.values.RevRodilloBUno}
                    onChange={(e) =>
                      handleRevRodilloBUnoChange(e.target.checked)
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
                    checked={formik.values.RevRodilloBDos}
                    onChange={(e) =>
                      handleRevRodilloBDosChange(e.target.checked)
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
                    checked={formik.values.RevSeparador}
                    onChange={(e) => handleRevSeparadorChange(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT U. Dúplex"
                control={
                  <Checkbox
                    id="RevDuplex"
                    name="RevDuplex"
                    checked={formik.values.RevDuplex}
                    onChange={(e) => handleRevDuplexChange(e.target.checked)}
                  />
                }
              />
            </div>
          </Collapse>
        </div>
      </div>

      <div className="w-full mt-16 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3 md:justify-end">
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
