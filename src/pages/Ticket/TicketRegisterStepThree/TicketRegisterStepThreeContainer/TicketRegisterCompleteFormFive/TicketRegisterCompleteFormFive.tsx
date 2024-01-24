import { useEffect, useState } from "react"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import { ConstantLocalStorage } from "../../../../../common/constants"
import { useFormik } from "formik"
import {
  GetTicketById,
  TicketRegisterStepThreeRequestFormFive,
} from "../../../../../common/interfaces/Ticket.interface"
import { TicketService } from "../../../../../common/services/TicketService"
import { Alert, Checkbox, FormControlLabel, Snackbar } from "@mui/material"
import moment from "moment"
import { useTicket } from "../../../../../common/contexts/TicketContext"

const validationSchema = yup.object({})

export const TicketRegisterCompleteFormFive = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [ticketFormFive, setTicketFormFive] = useState<any>()
  const [open, setOpen] = useState(false)
  const { setTicketStep } = useTicket()

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
    if (!isNext) return setTicketStep(4)
    const isFormValid = Object.values(formik.values).some(
      (value) => value !== false
    )

    if (isFormValid) {
      const requestFormFive: TicketRegisterStepThreeRequestFormFive = {
        UsoPapelHumedo: formik.values.UsoPapelHumedo,
        UsoPapelReciclado: formik.values.UsoPapelReciclado,
        UsoPapelGrapas: formik.values.UsoPapelGrapas,
        UsoEtiquetas: formik.values.UsoEtiquetas,
        ConectadoPared: formik.values.ConectadoPared,
        ConectadoSupresor: formik.values.ConectadoSupresor,
        ConectadoEstabilizador: formik.values.ConectadoEstabilizador,
        ConectadoUPS: formik.values.ConectadoUPS,
        Operativo: formik.values.Operativo,
        PegadoEtiquetaGarantia: formik.values.PegadoEtiquetaGarantia,
        EnObservacion: formik.values.EnObservacion,
        EquipoRequiereCambio: formik.values.EquipoRequiereCambio,
        EquipoRequiereMantenimiento: formik.values.EquipoRequiereMantenimiento,
        CartuchoOtroProveedor: formik.values.CartuchoOtroProveedor,
        CartuchoDanado: formik.values.CartuchoDanado,
        Instalacion: formik.values.Instalacion,
        ServicioGarantia: formik.values.ServicioGarantia,
        Negligencia: formik.values.Negligencia,
        Mantenimiento: formik.values.Mantenimiento,
        Retiro: formik.values.Retiro,
        Reparacion: formik.values.Reparacion,
      }

      secureLocalStorage.setItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_FIVE,
        requestFormFive
      )

      isNext ? setTicketStep(6) : setTicketStep(4)
    } else {
      setOpen(true)
    }
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
    setTicketFormFive(
      secureLocalStorage.getItem(
        ConstantLocalStorage.TICKET_STEP_THREE_FORM_FIVE
      )
    )
    if (ticket) {
      formik.setValues({
        UsoPapelHumedo: ticketFormFive?.UsoPapelHumedo || false,
        UsoPapelReciclado: ticketFormFive?.UsoPapelReciclado || false,
        UsoPapelGrapas: ticketFormFive?.UsoPapelGrapas || false,
        UsoEtiquetas: ticketFormFive?.UsoEtiquetas || false,
        ConectadoPared: ticketFormFive?.ConectadoPared || false,
        ConectadoSupresor: ticketFormFive?.ConectadoSupresor || false,
        ConectadoEstabilizador: ticketFormFive?.ConectadoEstabilizador || false,
        ConectadoUPS: ticketFormFive?.ConectadoUPS || false,
        Operativo: ticketFormFive?.Operativo || false,
        PegadoEtiquetaGarantia: ticketFormFive?.PegadoEtiquetaGarantia || false,
        EnObservacion: ticketFormFive?.EnObservacion || false,
        EquipoRequiereCambio: ticketFormFive?.EquipoRequiereCambio || false,
        EquipoRequiereMantenimiento:
          ticketFormFive?.EquipoRequiereMantenimiento || false,
        CartuchoOtroProveedor: ticketFormFive?.CartuchoOtroProveedor || false,
        CartuchoDanado: ticketFormFive?.CartuchoDanado || false,
        Instalacion: ticketFormFive?.Instalacion || false,
        ServicioGarantia: ticketFormFive?.ServicioGarantia || false,
        Negligencia: ticketFormFive?.Negligencia || false,
        Mantenimiento: ticketFormFive?.Mantenimiento || false,
        Retiro: ticketFormFive?.Retiro || false,
        Reparacion: ticketFormFive?.Reparacion || false,
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
          <h4 className="font-semibold text-lg">Comentario</h4>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                checked={formik.values.UsoPapelHumedo}
                onChange={() =>
                  formik.setFieldValue(
                    "UsoPapelHumedo",
                    !formik.values.UsoPapelHumedo
                  )
                }
                control={<Checkbox />}
                label="Uso de papel húmedo"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.UsoPapelReciclado}
                onChange={() =>
                  formik.setFieldValue(
                    "UsoPapelReciclado",
                    !formik.values.UsoPapelReciclado
                  )
                }
                control={<Checkbox />}
                label="Uso de papel reciclado"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.UsoPapelGrapas}
                onChange={() =>
                  formik.setFieldValue(
                    "UsoPapelGrapas",
                    !formik.values.UsoPapelGrapas
                  )
                }
                control={<Checkbox />}
                label="Uso de papel C grapas"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.UsoEtiquetas}
                onChange={() =>
                  formik.setFieldValue(
                    "UsoEtiquetas",
                    !formik.values.UsoEtiquetas
                  )
                }
                control={<Checkbox />}
                label="Uso de etiquetas"
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="flex flex-col">
            <div>
              <FormControlLabel
                checked={formik.values.ConectadoPared}
                onChange={() =>
                  formik.setFieldValue(
                    "ConectadoPared",
                    !formik.values.ConectadoPared
                  )
                }
                control={<Checkbox />}
                label="Conectado a la pared"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.ConectadoSupresor}
                onChange={() =>
                  formik.setFieldValue(
                    "ConectadoSupresor",
                    !formik.values.ConectadoSupresor
                  )
                }
                control={<Checkbox />}
                label="Conectado a supresor"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.ConectadoEstabilizador}
                onChange={() =>
                  formik.setFieldValue(
                    "ConectadoEstabilizador",
                    !formik.values.ConectadoEstabilizador
                  )
                }
                control={<Checkbox />}
                label="Conectado a estabilizador"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.ConectadoUPS}
                onChange={() =>
                  formik.setFieldValue(
                    "ConectadoUPS",
                    !formik.values.ConectadoUPS
                  )
                }
                control={<Checkbox />}
                label="Conectado a UPS"
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              checked={formik.values.Operativo}
              onChange={() =>
                formik.setFieldValue("Operativo", !formik.values.Operativo)
              }
              control={<Checkbox />}
              label="Operativo"
            />
            <div>
              <FormControlLabel
                control={<Checkbox />}
                checked={formik.values.PegadoEtiquetaGarantia}
                onChange={() =>
                  formik.setFieldValue(
                    "PegadoEtiquetaGarantia",
                    !formik.values.PegadoEtiquetaGarantia
                  )
                }
                label="Pegado de etiqueta garantía"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.EnObservacion}
                onChange={() =>
                  formik.setFieldValue(
                    "EnObservacion",
                    !formik.values.EnObservacion
                  )
                }
                control={<Checkbox />}
                label="En observación"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.EquipoRequiereCambio}
                onChange={() =>
                  formik.setFieldValue(
                    "EquipoRequiereCambio",
                    !formik.values.EquipoRequiereCambio
                  )
                }
                control={<Checkbox />}
                label="Equipo requiere cambio"
              />
            </div>
            <div>
              <FormControlLabel
                checked={formik.values.EquipoRequiereMantenimiento}
                onChange={() =>
                  formik.setFieldValue(
                    "EquipoRequiereMantenimiento",
                    !formik.values.EquipoRequiereMantenimiento
                  )
                }
                control={<Checkbox />}
                label="Equipo requiere mantenimiento"
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              checked={formik.values.CartuchoOtroProveedor}
              onChange={() =>
                formik.setFieldValue(
                  "CartuchoOtroProveedor",
                  !formik.values.CartuchoOtroProveedor
                )
              }
              label="Cartucho otro proveedor"
              control={<Checkbox />}
            />
            <FormControlLabel
              checked={formik.values.CartuchoDanado}
              onChange={() =>
                formik.setFieldValue(
                  "CartuchoDanado",
                  !formik.values.CartuchoDanado
                )
              }
              label="Cartucho dañado"
              control={<Checkbox />}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <FormControlLabel
            checked={formik.values.Instalacion}
            onChange={() =>
              formik.setFieldValue("Instalacion", !formik.values.Instalacion)
            }
            label="Instalación"
            control={<Checkbox />}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <FormControlLabel
            checked={formik.values.ServicioGarantia}
            onChange={() =>
              formik.setFieldValue(
                "ServicioGarantia",
                !formik.values.ServicioGarantia
              )
            }
            label="Servicio de garantía"
            control={<Checkbox />}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <FormControlLabel
            checked={formik.values.Negligencia}
            onChange={() =>
              formik.setFieldValue("Negligencia", !formik.values.Negligencia)
            }
            label="Negligencia"
            control={<Checkbox />}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="flex flex-col">
            <FormControlLabel
              checked={formik.values.Mantenimiento}
              onChange={() =>
                formik.setFieldValue(
                  "Mantenimiento",
                  !formik.values.Mantenimiento
                )
              }
              label="Mantenimiento"
              control={<Checkbox />}
            />
          </div>
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
