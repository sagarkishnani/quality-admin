import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { Checkbox, FormControlLabel } from "@mui/material"
import moment from "moment"
import { useTicket } from "../../../../../common/contexts/TicketContext"

export const TicketRegisterViewFormFive = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setTicketStep } = useTicket()

  function registerTicketStep(isNext: boolean) {
    isNext ? setTicketStep(6) : setTicketStep(4)
  }

  const formik = useFormik({
    initialValues: {
      UsoPapelHumedo: false,
      UsoPapelReciclado: false,
      UsoPapelGrapas: false,
      UsoEtiquetas: false,
      ConectadoPared: false,
      ConectadoSupresor: false,
      ConectadoEstabilizador: false,
      ConectadoUPS: false,
      Operativo: false,
      PegadoEtiquetaGarantia: false,
      EnObservacion: false,
      EquipoRequiereCambio: false,
      EquipoRequiereMantenimiento: false,
      CartuchoOtroProveedor: false,
      CartuchoDanado: false,
      Instalacion: false,
      ServicioGarantia: false,
      Negligencia: false,
      Mantenimiento: false,
      Retiro: false,
      Reparacion: false,
    },
    onSubmit: (values) => {},
  })

  useEffect(() => {
    setIsLoading(true)
    if (ticket) {
      formik.setValues({
        UsoPapelHumedo: ticket?.TicketAnswer?.UsoPapelHumedo || false,
        UsoPapelReciclado: ticket?.TicketAnswer?.UsoPapelReciclado || false,
        UsoPapelGrapas: ticket?.TicketAnswer?.UsoPapelGrapas || false,
        UsoEtiquetas: ticket?.TicketAnswer?.UsoEtiquetas || false,
        ConectadoPared: ticket?.TicketAnswer?.ConectadoPared || false,
        ConectadoSupresor: ticket?.TicketAnswer?.ConectadoSupresor || false,
        ConectadoEstabilizador:
          ticket?.TicketAnswer?.ConectadoEstabilizador || false,
        ConectadoUPS: ticket?.TicketAnswer?.ConectadoUPS || false,
        Operativo: ticket?.TicketAnswer?.Operativo || false,
        PegadoEtiquetaGarantia:
          ticket?.TicketAnswer?.PegadoEtiquetaGarantia || false,
        EnObservacion: ticket?.TicketAnswer?.EnObservacion || false,
        EquipoRequiereCambio:
          ticket?.TicketAnswer?.EquipoRequiereCambio || false,
        EquipoRequiereMantenimiento:
          ticket?.TicketAnswer?.EquipoRequiereMantenimiento || false,
        CartuchoOtroProveedor:
          ticket?.TicketAnswer?.CartuchoOtroProveedor || false,
        CartuchoDanado: ticket?.TicketAnswer?.CartuchoDanado || false,
        Instalacion: ticket?.TicketAnswer?.Instalacion || false,
        ServicioGarantia: ticket?.TicketAnswer?.ServicioGarantia || false,
        Negligencia: ticket?.TicketAnswer?.Negligencia || false,
        Mantenimiento: ticket?.TicketAnswer?.Mantenimiento || false,
        Retiro: ticket?.TicketAnswer?.Retiro || false,
        Reparacion: ticket?.TicketAnswer?.Reparacion || false,
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
          <h4 className="font-semibold text-lg">Comentario</h4>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={formik.values.UsoPapelHumedo} disabled />
                }
                label="Uso de papel húmedo"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.UsoPapelReciclado}
                    disabled
                  />
                }
                label="Uso de papel reciclado"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={formik.values.UsoPapelGrapas} disabled />
                }
                label="Uso de papel C grapas"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={formik.values.UsoEtiquetas} disabled />
                }
                label="Uso de etiquetas"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={formik.values.ConectadoPared} disabled />
                }
                label="Conectado a la pared"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.ConectadoSupresor}
                    disabled
                  />
                }
                label="Conectado a supresor"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.ConectadoEstabilizador}
                    disabled
                  />
                }
                label="Conectado a estabilizador"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={formik.values.ConectadoUPS} disabled />
                }
                label="Conectado a UPS"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              control={<Checkbox checked={formik.values.Operativo} disabled />}
              label="Operativo"
            />
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.PegadoEtiquetaGarantia}
                    disabled
                  />
                }
                label="Pegado de etiqueta garantía"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={formik.values.EnObservacion} disabled />
                }
                label="En observación"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.EquipoRequiereCambio}
                    disabled
                  />
                }
                label="Equipo requiere cambio"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.EquipoRequiereMantenimiento}
                    disabled
                  />
                }
                label="Equipo requiere mantenimiento"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              label="Cartucho otro proveedor"
              control={
                <Checkbox
                  checked={formik.values.CartuchoOtroProveedor}
                  disabled
                />
              }
            />
            <FormControlLabel
              label="Cartucho dañado"
              control={
                <Checkbox checked={formik.values.CartuchoDanado} disabled />
              }
            />
          </div>
        </div>
        <div className="col-span-3">
          <FormControlLabel
            label="Instalación"
            control={<Checkbox checked={formik.values.Instalacion} disabled />}
          />
        </div>
        <div className="col-span-3">
          <FormControlLabel
            label="Servicio de garantía"
            control={
              <Checkbox checked={formik.values.ServicioGarantia} disabled />
            }
          />
        </div>
        <div className="col-span-3">
          <FormControlLabel
            label="Negligencia"
            control={<Checkbox checked={formik.values.Negligencia} disabled />}
          />
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              label="Mantenimiento"
              control={
                <Checkbox checked={formik.values.Mantenimiento} disabled />
              }
            />
          </div>
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
