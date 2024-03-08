import { createClient } from "@supabase/supabase-js"
import { TicketRegisterStepThreeRequest } from "../interfaces/Ticket.interface"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function registerTicketAnswer(
  idTicket: string,
  request: TicketRegisterStepThreeRequest
) {
  try {
    const { data, error, status } = await supabase
      .from("TicketAnswer")
      .insert([
        {
          IdTicket: idTicket,
          BandejaUno: request.StepThree.BandejaUno,
          BisagraEscaner: request.StepThree.BisagraEscaner,
          BandejaDos: request.StepThree.BandejaDos,
          BandejaADF: request.StepThree.BandejaADF,
          BandejaSalida: request.StepThree.BandejaSalida,
          CristalCamaPlana: request.StepThree.CristalCamaPlana,
          ConectorUSB: request.StepThree.ConectorUSB,
          Engranaje: request.StepThree.Engranaje,
          ConectorRJ: request.StepThree.ConectorRJ,
          LaminaTeplon: request.StepThree.LaminaTeplon,
          PanelControl: request.StepThree.PanelControl,
          RodilloPresion: request.StepThree.RodilloPresion,
          // Instalacion: request.Instalacion,
          Retiro: request.StepFour.Retiro,
          Reparacion: request.StepFour.Reparacion,
          ActualFirmware: request.StepFour.ActualFirmware,
          EtiquetaFusor: request.StepFour.EtiquetaFusor,
          EtiquetaFusorTeflon: request.StepFour.EtiquetaFusorTeflon,
          Cambio: request.StepFour.Cambio,
          CambioCartucho: request.StepFour.CambioCartucho,
          CambioFusor: request.StepFour.CambioCartucho,
          CambioImagen: request.StepFour.CambioImagen,
          CambioRodillo: request.StepFour.CambioRodillo,
          CambioTeflon: request.StepFour.CambioTeflon,
          CambioRodilloBUno: request.StepFour.CambioRodilloBUno,
          CambioRodilloBDos: request.StepFour.CambioRodilloBDos,
          CambioSeparador: request.StepFour.CambioSeparador,
          CambioDrive: request.StepFour.CambioDrive,
          CambioSwing: request.StepFour.CambioSwing,
          CambioAOF: request.StepFour.CambioAOF,
          CambioDC: request.StepFour.CambioDC,
          MantenimientoCheck: request.StepFour.Mantenimiento,
          MantImpresora: request.StepFour.MantImpresora,
          MantOptico: request.StepFour.MantOptico,
          MantOpticoEscaner: request.StepFour.MantOpticoEscaner,
          MantSistema: request.StepFour.MantSistema,
          Revision: request.StepFour.Revision,
          RevCartucho: request.StepFour.RevCartucho,
          RevFusor: request.StepFour.RevFusor,
          RevImagen: request.StepFour.RevImagen,
          RevADF: request.StepFour.RevADF,
          RevRodilloBUno: request.StepFour.RevRodilloBUno,
          RevRodilloBDos: request.StepFour.RevRodilloBDos,
          RevSeparador: request.StepFour.RevSeparador,
          RevDuplex: request.StepFour.RevDuplex,
          UsoPapelHumedo: request.StepFive.UsoPapelHumedo,
          UsoPapelReciclado: request.StepFive.UsoPapelReciclado,
          UsoPapelGrapas: request.StepFive.UsoPapelGrapas,
          UsoEtiquetas: request.StepFive.UsoEtiquetas,
          ConectadoPared: request.StepFive.ConectadoPared,
          ConectadoSupresor: request.StepFive.ConectadoSupresor,
          ConectadoEstabilizador: request.StepFive.ConectadoEstabilizador,
          ConectadoUPS: request.StepFive.ConectadoUPS,
          Operativo: request.StepFive.Operativo,
          PegadoEtiquetaGarantia: request.StepFive.PegadoEtiquetaGarantia,
          EnObservacion: request.StepFive.EnObservacion,
          EquipoRequiereCambio: request.StepFive.EquipoRequiereCambio,
          EquipoRequiereMantenimiento:
            request.StepFive.EquipoRequiereMantenimiento,
          CartuchoOtroProveedor: request.StepFive.CartuchoOtroProveedor,
          CartuchoDanado: request.StepFive.CartuchoDanado,
          Instalacion: request.StepFive.Instalacion,
          ServicioGarantia: request.StepFive.ServicioGarantia,
          Negligencia: request.StepFive.Negligencia,
          Mantenimiento: request.StepFive.Mantenimiento,
        },
      ])
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar respuestas del ticket", error)
    return error
  }
}

export const TicketAnswerService = {
  registerTicketAnswer,
}
