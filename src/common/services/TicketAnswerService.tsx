import { createClient } from "@supabase/supabase-js"
import { RegisterTicketAnswerRequest } from "../interfaces/TicketAnswer.interface"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function registerTicketAnswer(request: RegisterTicketAnswerRequest) {
  try {
    const { data, error, status } = await supabase
      .from("TicketAnswer")
      .insert([
        {
          IdTicket: request.IdTicket,
          BandejaUno: request.BandejaUno,
          BisagraEscaner: request.BisagraEscaner,
          BandejaDos: request.BisagraEscaner,
          BandejaADF: request.BandejaADF,
          BandejaSalida: request.BandejaSalida,
          CristalCamaPlana: request.CristalCamaPlana,
          ConectorUSB: request.ConectorUSB,
          Engranaje: request.Engranaje,
          ConectorRJ: request.ConectorRJ,
          LaminaTeplon: request.LaminaTeplon,
          PanelControl: request.PanelControl,
          RodilloPresion: request.RodilloPresion,
          // Instalacion: request.Instalacion,
          Retiro: request.Retiro,
          Reparacion: request.Reparacion,
          ActualFirmware: request.ActualFirmware,
          EtiquetaFusor: request.EtiquetaFusor,
          EtiquetaFusorTeflon: request.EtiquetaFusorTeflon,
          CambioCartucho: request.CambioCartucho,
          CambioFusor: request.CambioFusor,
          CambioImagen: request.CambioImagen,
          CambioRodillo: request.CambioRodillo,
          CambioTeflon: request.CambioTeflon,
          CambioRodilloBUno: request.CambioRodilloBUno,
          CambioRodilloBDos: request.CambioRodilloBDos,
          CambioSeparador: request.CambioSeparador,
          CambioDrive: request.CambioDrive,
          CambioSwing: request.CambioSwing,
          CambioAOF: request.CambioAOF,
          CambioDC: request.CambioDC,
          MantImpresora: request.MantImpresora,
          MantOptico: request.MantOptico,
          MantOpticoEscaner: request.MantOpticoEscaner,
          MantSistema: request.MantSistema,
          RevCartucho: request.RevCartucho,
          RevFusor: request.RevFusor,
          RevImagen: request.RevImagen,
          RevADF: request.RevADF,
          RevRodilloBUno: request.RevRodilloBUno,
          RevRodilloBDos: request.RevRodilloBDos,
          RevSeparador: request.RevSeparador,
          RevDuplex: request.RevDuplex,
          UsoPapelHumedo: request.UsoPapelHumedo,
          UsoPapelReciclado: request.UsoPapelReciclado,
          UsoPapelGrapas: request.UsoPapelGrapas,
          UsoEtiquetas: request.UsoEtiquetas,
          ConectadoPared: request.ConectadoPared,
          ConectadoSupresor: request.ConectadoSupresor,
          ConectadoEstabilizador: request.ConectadoEstabilizador,
          ConectadoUPS: request.ConectadoUPS,
          Operativo: request.Operativo,
          PegadoEtiquetaGarantia: request.PegadoEtiquetaGarantia,
          EnObservacion: request.EnObservacion,
          EquipoRequiereCambio: request.EquipoRequiereCambio,
          EquipoRequiereMantenimiento: request.EquipoRequiereMantenimiento,
          CartuchoOtroProveedor: request.CartuchoOtroProveedor,
          CartuchoDanado: request.CartuchoDanado,
          Instalacion: request.Instalacion,
          ServicioGarantia: request.ServicioGarantia,
          Negligencia: request.Negligencia,
          Mantenimiento: request.Mantenimiento,
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
    console.error("Error al registrar ticket", error)
    return error
  }
}

export const TicketService = {
  registerTicketAnswer,
}
