import logo from "../../assets/mailBackgrounds/technicalServiceReportBG.svg"

export interface PDFData {
  RecordCreationDate: string
  AppointmentInitTime: string
  AppointmentEndTime: string
  Company: string
  Address: string
  Local: string
  CompanyFloor: string
  CompanyArea: string
  User: string
  DeviceOne: string
  SeriesNumberOne: string
  CounterOne: string
  GuideOne: string
  DeviceTwo: string
  SeriesNumberTwo: string
  CounterTwo: string
  GuideTwo: string
  ReportedFailure: string
  FoundFailure: string
  Revision: Revision
  Procedure: Procedure
  Comments: Comments
  Instalacion: string
  ServicioGarantia: string
  Negligencia: string
  Mantenimiento: string
  FacturableVisit: string
  Comment: string
  Recommendation: string
  Signature: Signature
}

export interface Revision {
  BandejaUno: string
  BandejaDos: string
  BandejaSalida: string
  BisagraEscaner: string
  BandejaADF: string
  CristalCamaPlana: string
  ConectorUSB: string
  ConectorRJ: string
  PanelControl: string
  Engranaje: string
  LaminaTeplon: string
  RodilloPresion: string
}

export interface Procedure {
  Instalacion: string
  Cambio: string
  Mantenimiento: string
  Reparacion: string
  Retiro: string
  Revision: string
  MantImpresora: string
  MantOptico: string
  MantOpticoEscaner: string
  MantSistema: string
  ActualFirmware: string
  EtiquetaFusor: string
  EtiquetaFusorTeflon: string
  RevCartucho: string
  RevFusor: string
  RevImagen: string
  RevADF: string
  RevRodilloBUno: string
  RevRodilloBDos: string
  RevSeparador: string
  RevDuplex: string
  CambioCartucho: string
  CambioFusor: string
  CambioImagen: string
  CambioRodillo: string
  CambioTeflon: string
  CambioRodilloBUno: string
  CambioRodilloBDos: string
  CambioSeparador: string
  CambioDrive: string
  CambioSwing: string
  CambioAOF: string
  CambioDC: string
}

export interface Comments {
  UsoPapelHumedo: string
  UsoPapelReciclado: string
  UsoPapelGrapas: string
  UsoEtiquetas: string
  ConectadoPared: string
  ConectadoSupresor: string
  ConectadoEstabilizador: string
  ConectadoUPS: string
  Operativo: string
  PegadoEtiquetaGarantia: string
  EnObservacion: string
  EquipoRequiereCambio: string
  EquipoRequiereMantenimiento: string
  CartuchoOtroProveedor: string
  CartuchoDanado: string
}

export interface Signature {
  ResponsibleName: string
  ResponsibleDni: string
  ResponsibleSignature: string
  TechnicianName: string
  TechnicianSignature: string
}

//DATA EXAMPLE
//   const pdfData = {
//     RecordCreationDate: "01/01/2023",
//     AppointmentInitTime: "08:00",
//     AppointmentEndTime: "12:00",
//     Company: "Clínica Javier Prado",
//     Address: "Av. Javier Prado Este 499",
//     Local: "Local San Isidro",
//     CompanyFloor: "6",
//     CompanyArea: "Recursos Humanos",
//     User: "Sagar Kishnani",
//     DeviceOne: "ALTALINK B8055",
//     SeriesNumberOne: "T-32423",
//     CounterOne: "340",
//     GuideOne: "4523232",
//     DeviceTwo: "LASERJET ENTERPRISE M606N",
//     SeriesNumberTwo: "L-43321",
//     CounterTwo: "10",
//     GuideTwo: "4523232",
//     ReportedFailure:
//       "La impresora se atascó y ya no está funcionando correctamente.",
//     FoundFailure:
//       "Se encontró que la impresora estaba fallando porque había sufrido una caída y la bandeja tuvo un daño.",
//     Revision: {
//       BandejaUno: "B",
//       BandejaDos: "L",
//       BandejaSalida: "B",
//       BisagraEscaner: "G",
//       BandejaADF: "B",
//       CristalCamaPlana: "B",
//       ConectorUSB: "B",
//       ConectorRJ: "L",
//       PanelControl: "L",
//       Engranaje: "L",
//       LaminaTeplon: "G",
//       RodilloPresion: "G",
//     },
//     Procedure: {
//       Instalacion: "X",
//       Cambio: "X",
//       Mantenimiento: "X",
//       Reparacion: "X",
//       Retiro: "X",
//       Revision: "X",
//       MantImpresora: "X",
//       MantOptico: "",
//       MantOpticoEscaner: "",
//       MantSistema: "",
//       ActualFirmware: "X",
//       EtiquetaFusor: "X",
//       EtiquetaFusorTeflon: "X",
//       RevCartucho: "X",
//       RevFusor: "X",
//       RevImagen: "X",
//       RevADF: "X",
//       RevRodilloBUno: "X",
//       RevRodilloBDos: "X",
//       RevSeparador: "X",
//       RevDuplex: "X",
//       CambioCartucho: "",
//       CambioFusor: "",
//       CambioImagen: "",
//       CambioRodillo: "",
//       CambioTeflon: "",
//       CambioRodilloBUno: "",
//       CambioRodilloBDos: "",
//       CambioSeparador: "",
//       CambioDrive: "",
//       CambioSwing: "",
//       CambioAOF: "",
//       CambioDC: "X"
//     },
//     Comments: {
//       UsoPapelHumedo: "",
//       UsoPapelReciclado: "",
//       UsoPapelGrapas: "",
//       UsoEtiquetas: "",
//       ConectadoPared: "X",
//       ConectadoSupresor: "X",
//       ConectadoEstabilizador: "X",
//       ConectadoUPS: "",
//       Operativo: "",
//       PegadoEtiquetaGarantia: "",
//       EnObservacion: "",
//       EquipoRequiereCambio: "",
//       EquipoRequiereMantenimiento: "X",
//       CartuchoOtroProveedor: "",
//       CartuchoDanado: "",
//     },
//     Instalacion: "X",
//     ServicioGarantia: "",
//     Negligencia: "X",
//     Maintenance: "X", //ESTE CAMPO FALTÓ AGREGAR
//     FacturableVisit: "X",
//     Comment: "No hay comentarios.",
//     Recommendation:
//       "Se recomienda que tengan más cuidado a la hora de cargar la impresora.",
//     Signature: {
//       ResponsibleName: "Sagar Kishnani",
//       ResponsibleDni: "45895675",
//       ResponsibleSignature:
//         "https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/tickets/6f970d16-055a-4747-9ee9-79f43386abe3",
//       TechnicianName: "Jorge Ramón",
//       TechnicianSignature:
//         "https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/tickets/ab55aec9-d675-429e-86ab-aa3e8a0ce2b7",
//     },
//   }

export default function TechnicalServiceReport({ data }: { data: PDFData }) {
  return (
    <div style={{ position: "relative", fontSize: "12px", width: "780px" }}>
      <img src={logo} width="100%" />

      <div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "82px",
            top: "94px",
            left: "234px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.RecordCreationDate}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "65px",
            top: "94px",
            left: "395px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.AppointmentInitTime}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "128px",
            top: "94px",
            left: "535px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.AppointmentEndTime}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "402px",
            top: "108px",
            left: "234px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.Company}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "402px",
            top: "124px",
            left: "234px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.Address}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "255px",
            top: "141px",
            left: "234px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.Local}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "120px",
            top: "141px",
            left: "545px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.CompanyFloor}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "402px",
            top: "155px",
            left: "234px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.CompanyArea}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "402px",
            top: "172px",
            left: "234px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.User}
        </div>
      </div>

      <div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "100px",
            top: "203px",
            left: "165px",
            zIndex: "99",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          {data.DeviceOne}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "99px",
            top: "203px",
            left: "308px",
            zIndex: "99",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {data.SeriesNumberOne}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "75px",
            top: "203px",
            left: "472px",
            zIndex: "99",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {data.CounterOne}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "63px",
            top: "203px",
            left: "612px",
            zIndex: "99",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {data.GuideOne}
        </div>

        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "70px",
            top: "220px",
            left: "195px",
            zIndex: "99",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          {data.DeviceTwo}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "99px",
            top: "220px",
            left: "308px",
            zIndex: "99",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {data.SeriesNumberTwo}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "75px",
            top: "220px",
            left: "472px",
            zIndex: "99",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {data.CounterTwo}
        </div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "63px",
            top: "220px",
            left: "612px",
            zIndex: "99",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {data.GuideTwo}
        </div>
      </div>

      <div>
        <div
          style={{
            position: "absolute",
            height: "42px",
            width: "551px",
            top: "247px",
            left: "129px",
            zIndex: "99",
            lineHeight: "14px",
            textIndent: "290px",
          }}
        >
          {data.ReportedFailure}
        </div>
        <div
          style={{
            position: "absolute",
            height: "42px",
            width: "551px",
            top: "290px",
            left: "132px",
            zIndex: "99",
            lineHeight: "14px",
            textIndent: "190px",
          }}
        >
          {data.FoundFailure}
        </div>
      </div>

      <div>
        <div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "348px",
              left: "231px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.BandejaUno}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "360px",
              left: "231px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.BandejaDos}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "372px",
              left: "231px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.BandejaSalida}
          </div>
        </div>
        <div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "348px",
              left: "372px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.BisagraEscaner}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "360px",
              left: "372px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.BandejaADF}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "372px",
              left: "372px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.CristalCamaPlana}
          </div>
        </div>
        <div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "360px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.ConectorUSB}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "372px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.ConectorRJ}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "348px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.PanelControl}
          </div>
        </div>
        <div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "348px",
              left: "659px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.Engranaje}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "360px",
              left: "659px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.LaminaTeplon}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "372px",
              left: "659px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Revision.RodilloPresion}
          </div>
        </div>
      </div>

      <div>
        <div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "425px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.Instalacion}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "437px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.Cambio}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "450px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.Mantenimiento}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "462px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.Reparacion}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "474px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.Retiro}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "488px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.Revision}
          </div>
        </div>

        <div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "425px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.MantImpresora}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "437px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.MantOptico}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "450px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.MantOpticoEscaner}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "462px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.MantSistema}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "474px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.ActualFirmware}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "488px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.EtiquetaFusor}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "502px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.EtiquetaFusorTeflon}
          </div>
        </div>

        <div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "425px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.RevCartucho}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "437px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.RevFusor}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "450px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.RevImagen}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "462px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.RevADF}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "474px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.RevRodilloBUno}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "488px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.RevRodilloBDos}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "502px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.RevSeparador}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "514px",
              left: "516px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.RevDuplex}
          </div>
        </div>

        <div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "425px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioCartucho}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "437px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioFusor}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "452px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioImagen}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "464px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioRodillo}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "477px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioTeflon}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "490px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioRodilloBUno}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "502px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioRodilloBDos}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "514px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioSeparador}
          </div>

          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "527px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioDrive}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "540px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioSwing}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "553px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioAOF}
          </div>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "19px",
              top: "567px",
              left: "660px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Procedure.CambioDC}
          </div>
        </div>
      </div>

      <div>
        <div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "605px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.UsoPapelHumedo}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "620px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.UsoPapelReciclado}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "635px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.UsoPapelGrapas}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "650px",
              left: "230px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.UsoEtiquetas}
          </div>
        </div>

        <div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "605px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.ConectadoPared}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "620px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.ConectadoSupresor}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "635px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.ConectadoEstabilizador}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "650px",
              left: "373px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.ConectadoUPS}
          </div>
        </div>

        <div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "605px",
              left: "515px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.Operativo}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "620px",
              left: "515px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.PegadoEtiquetaGarantia}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "635px",
              left: "515px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.EnObservacion}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "650px",
              left: "515px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.EquipoRequiereCambio}
          </div>
        </div>

        <div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "605px",
              left: "658px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.CartuchoOtroProveedor}
          </div>
          <div
            style={{
              position: "absolute",
              height: "14px",
              width: "19px",
              top: "620px",
              left: "658px",
              zIndex: "99",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.Comments.CartuchoDanado}
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            position: "absolute",
            height: "14px",
            width: "19px",
            top: "695px",
            left: "230px",
            zIndex: "99",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.Instalacion}
        </div>
        <div
          style={{
            position: "absolute",
            height: "14px",
            width: "19px",
            top: "695px",
            left: "373px",
            zIndex: "99",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.ServicioGarantia}
        </div>
        <div
          style={{
            position: "absolute",
            height: "14px",
            width: "19px",
            top: "695px",
            left: "516px",
            zIndex: "99",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.Negligencia}
        </div>
        <div
          style={{
            position: "absolute",
            height: "14px",
            width: "19px",
            top: "695px",
            left: "659px",
            zIndex: "99",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.FacturableVisit}
        </div>
        <div
          style={{
            position: "absolute",
            height: "14px",
            width: "19px",
            top: "710px",
            left: "659px",
            zIndex: "99",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.Maintenance}
        </div>
      </div>

      <div>
        <div
          style={{
            position: "absolute",
            height: "54px",
            width: "494px",
            top: "724px",
            left: "142px",
            zIndex: "99",
            lineHeight: "16px",
            textIndent: "67px",
          }}
        >
          {data.Comment}
        </div>
        <div
          style={{
            position: "absolute",
            height: "54px",
            width: "494px",
            top: "798px",
            left: "142px",
            zIndex: "99",
            lineHeight: "16px",
            textIndent: "95px",
          }}
        >
          {data.Recommendation}
        </div>
      </div>

      <div>
        <div
          style={{
            position: "absolute",
            height: "55px",
            width: "150px",
            top: "870px",
            left: "127px",
            zIndex: "99",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "100%", objectFit: "contain" }}
            src={data.Signature.ResponsibleSignature}
          ></img>
        </div>

        <div
          style={{
            position: "absolute",
            height: "20px",
            width: "300px",
            top: "930px",
            left: "179px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.Signature.ResponsibleName}
        </div>
        <div
          style={{
            position: "absolute",
            height: "20px",
            width: "300px",
            top: "943px",
            left: "179px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.Signature.ResponsibleDni}
        </div>

        <div
          style={{
            position: "absolute",
            height: "55px",
            width: "150px",
            top: "870px",
            left: "460px",
            zIndex: "99",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "100%", objectFit: "contain" }}
            src={data.Signature.TechnicianSignature}
          ></img>
        </div>

        <div
          style={{
            position: "absolute",
            height: "20px",
            width: "300px",
            top: "930px",
            left: "450px",
            zIndex: "99",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.Signature.TechnicianName}
        </div>
      </div>
    </div>
  )
}
