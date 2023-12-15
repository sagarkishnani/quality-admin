import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { Checkbox, Collapse, FormControlLabel } from "@mui/material"
import moment from "moment"
import { HiChevronRight, HiChevronDown } from "react-icons/hi"
import { useTicket } from "../../../../../common/contexts/TicketContext"

export const TicketRegisterViewFormFour = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setTicketStep } = useTicket()
  const [isCollapsedCambio, setIsCollapsedCambio] = useState(true)
  const [isCollapsedMantenimiento, setIsCollapsedMantenimiento] = useState(true)
  const [isCollapsedRevision, setIsCollapsedRevision] = useState(true)

  function registerTicketStep(isNext: boolean) {
    isNext ? setTicketStep(5) : setTicketStep(3)
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
    onSubmit: (values) => {},
  })

  useEffect(() => {
    setIsLoading(true)
    if (ticket) {
      formik.setValues({
        Instalacion: ticket?.TicketAnswer?.Instalacion || false,
        Retiro: ticket?.TicketAnswer?.Retiro || false,
        Reparacion: ticket?.TicketAnswer?.Reparacion || false,
        ActualFirmware: ticket?.TicketAnswer?.ActualFirmware || false,
        EtiquetaFusor: ticket?.TicketAnswer?.EtiquetaFusor || false,
        EtiquetaFusorTeflon: ticket?.TicketAnswer?.EtiquetaFusorTeflon || false,
        Cambio: ticket?.TicketAnswer?.Cambio || false,
        CambioCartucho: ticket?.TicketAnswer?.CambioCartucho || false,
        CambioFusor: ticket?.TicketAnswer?.CambioFusor || false,
        CambioImagen: ticket?.TicketAnswer?.CambioImagen || false,
        CambioRodillo: ticket?.TicketAnswer?.CambioRodillo || false,
        CambioTeflon: ticket?.TicketAnswer?.CambioTeflon || false,
        CambioRodilloBUno: ticket?.TicketAnswer?.CambioRodilloBUno || false,
        CambioRodilloBDos: ticket?.TicketAnswer?.CambioRodilloBDos || false,
        CambioSeparador: ticket?.TicketAnswer?.CambioSeparador || false,
        CambioDrive: ticket?.TicketAnswer?.CambioDrive || false,
        CambioSwing: ticket?.TicketAnswer?.CambioSwing || false,
        CambioAOF: ticket?.TicketAnswer?.CambioAOF || false,
        CambioDC: ticket?.TicketAnswer?.CambioDC || false,
        Mantenimiento: ticket?.TicketAnswer?.Mantenimiento || false,
        MantImpresora: ticket?.TicketAnswer?.MantImpresora || false,
        MantOptico: ticket?.TicketAnswer?.MantOptico || false,
        MantOpticoEscaner: ticket?.TicketAnswer?.MantOpticoEscaner || false,
        MantSistema: ticket?.TicketAnswer?.MantSistema || false,
        Revision: ticket?.TicketAnswer?.Revision || false,
        RevCartucho: ticket?.TicketAnswer?.RevCartucho || false,
        RevFusor: ticket?.TicketAnswer?.RevFusor || false,
        RevImagen: ticket?.TicketAnswer?.RevImagen || false,
        RevADF: ticket?.TicketAnswer?.RevADF || false,
        RevRodilloBUno: ticket?.TicketAnswer?.RevRodilloBUno || false,
        RevRodilloBDos: ticket?.TicketAnswer?.RevRodilloBDos || false,
        RevSeparador: ticket?.TicketAnswer?.RevSeparador || false,
        RevDuplex: ticket?.TicketAnswer?.RevDuplex || false,
      })
    }
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
          <h4 className="font-semibold text-lg">Procedimiento</h4>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                id="Instalacion"
                name="Instalacion"
                control={
                  <Checkbox checked={formik.values.Instalacion} disabled />
                }
                label="Instalación"
              />
            </div>
            <div>
              <FormControlLabel
                id="Retiro"
                name="Retiro"
                control={<Checkbox checked={formik.values.Retiro} disabled />}
                label="Retiro"
              />
            </div>
            <div>
              <FormControlLabel
                id="Reparacion"
                name="Reparacion"
                control={
                  <Checkbox checked={formik.values.Reparacion} disabled />
                }
                label="Reparación"
              />
            </div>
            <div>
              <FormControlLabel
                id="ActualFirmware"
                name="ActualFirmware"
                control={
                  <Checkbox checked={formik.values.ActualFirmware} disabled />
                }
                label="Actual. Firmware"
              />
            </div>
            <div>
              <FormControlLabel
                id="EtiquetaFusor"
                name="EtiquetaFusor"
                control={
                  <Checkbox checked={formik.values.EtiquetaFusor} disabled />
                }
                label="Etiqueta en fusor"
              />
            </div>
            <div>
              <FormControlLabel
                id="EtiquetaFusorTeflon"
                name="EtiquetaFusorTeflon"
                control={
                  <Checkbox
                    checked={formik.values.EtiquetaFusorTeflon}
                    disabled
                  />
                }
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    checked={formik.values.CambioRodilloBDos}
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
                    checked={formik.values.CambioSeparador}
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                  <Checkbox
                    id="MantImpresora"
                    name="MantImpresora"
                    checked={formik.values.MantImpresora}
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    checked={formik.values.RevCartucho}
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    checked={formik.values.RevRodilloBDos}
                    disabled
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
                    disabled
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
                    disabled
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
    </>
  )
}
