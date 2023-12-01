import { useEffect, useState } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantLocalStorage,
  ConstantsMasterTable,
} from "../../../../../common/constants"
import { useFormik } from "formik"
import { GetTicketById } from "../../../../../common/interfaces/Ticket.interface"
import { useAuth } from "../../../../../common/contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { TicketService } from "../../../../../common/services/TicketService"
import {
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

export const TicketRegisterViewFormFour = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [devices, setDevices] = useState<MasterTable[]>([])
  const { user } = useAuth()
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

  function registerTicketStep(isNext: boolean) {
    isNext ? setTicketStep(5) : setTicketStep(3)
  }

  const formik = useFormik({
    initialValues: {
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
    formik.setFieldValue("CambioCartucho", isChecked)
    formik.setFieldValue("CambioFusor", isChecked)
  }

  const handleRevisionChange = (isChecked) => {
    formik.setFieldValue("CambioCartucho", isChecked)
    formik.setFieldValue("CambioFusor", isChecked)
  }

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
                control={<Checkbox disabled checked />}
                label="Instalación"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled checked />}
                label="Retiro"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Reparación"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Actual Firmware"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Etiqueta en fusor"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox disabled />}
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
                disabled
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
                    disabled
                  />
                }
              />
              <FormControlLabel
                label="Cambio de fusor"
                control={
                  <Checkbox id="CambioFusor" name="CambioFusor" disabled />
                }
              />
              <FormControlLabel
                label="Cambio de U imagen"
                control={
                  <Checkbox id="CambioImagen" name="CambioImagen" disabled />
                }
              />
              <FormControlLabel
                label="Cambio de rodillo"
                control={
                  <Checkbox id="CambioRodillo" name="CambioRodillo" disabled />
                }
              />
              <FormControlLabel
                label="Cambio de teflón"
                control={
                  <Checkbox id="CambioTeflon" name="CambioTeflon" disabled />
                }
              />
              <FormControlLabel
                label="Cambio rodillo B1/B3"
                control={
                  <Checkbox
                    id="CambioRodilloBUno"
                    name="CambioRodilloBUno"
                    disabled
                  />
                }
              />
              <FormControlLabel
                label="Cambio rodillo B2/B4"
                control={
                  <Checkbox
                    id="CambioRodilloBDos"
                    name="CambioRodilloBDos"
                    disabled
                  />
                }
              />
              <FormControlLabel
                label="Cambio separador"
                control={
                  <Checkbox
                    id="CambioSeparador"
                    name="CambioSeparador"
                    disabled
                  />
                }
              />
              <FormControlLabel
                label="Cambio drive assembly"
                control={
                  <Checkbox id="CambioDrive" name="CambioDrive" disabled />
                }
              />
              <FormControlLabel
                label="Cambio de swing place"
                control={
                  <Checkbox id="CambioSwing" name="CambioSwing" disabled />
                }
              />
              <FormControlLabel
                label="Cambio de AOF"
                control={<Checkbox id="CambioAOF" name="CambioAOF" disabled />}
              />
              <FormControlLabel
                label="Cambio DC"
                control={<Checkbox id="CambioDC" name="CambioDC" disabled />}
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
                      formik.values.CambioCartucho && formik.values.CambioFusor
                    }
                    indeterminate={
                      formik.values.CambioCartucho !==
                        formik.values.CambioFusor &&
                      (formik.values.CambioCartucho ||
                        formik.values.CambioFusor)
                    }
                    disabled
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
                  <Checkbox id="MantImpresora" name="MantImpresora" disabled />
                }
              />
              <FormControlLabel
                label="Mant. Óptico Impresora"
                control={
                  <Checkbox id="MantOptico" name="MantOptico" disabled />
                }
              />
              <FormControlLabel
                label="Mant. Óptico Escáner"
                control={
                  <Checkbox
                    id="MantOpticoEscaner"
                    name="MantOpticoEscaner"
                    disabled
                  />
                }
              />
              <FormControlLabel
                label="Mant. Sistema ADF"
                control={
                  <Checkbox id="MantSistema" name="MantSistema" disabled />
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
                    checked={true}
                    indeterminate={
                      formik.values.CambioCartucho !==
                        formik.values.CambioFusor &&
                      (formik.values.CambioCartucho ||
                        formik.values.CambioFusor)
                    }
                    disabled
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
                    checked
                    disabled
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Fusor"
                control={
                  <Checkbox id="RevFusor" name="RevFusor" checked disabled />
                }
              />
              <FormControlLabel
                label="REV/MANT U Imagen"
                control={
                  <Checkbox id="RevImagen" name="RevImagen" checked disabled />
                }
              />
              <FormControlLabel
                label="REV/MANT ADF"
                control={<Checkbox id="RevADF" name="RevADF" disabled />}
              />
              <FormControlLabel
                label="REV/MANT Rodillo B1 / B3"
                control={
                  <Checkbox
                    id="RevRodilloBUno"
                    name="RevRodilloBUno"
                    disabled
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Rodillo B2 / B4"
                control={
                  <Checkbox
                    id="RevRodilloBDos"
                    name="RevRodilloBDos"
                    disabled
                  />
                }
              />
              <FormControlLabel
                label="REV/MANT Separador"
                control={
                  <Checkbox id="RevSeparador" name="RevSeparador" disabled />
                }
              />
              <FormControlLabel
                label="REV/MANT U. Dúplex"
                control={<Checkbox id="RevDuplex" name="RevDuplex" disabled />}
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
    </>
  )
}
