import moment from "moment";
import XLSXStyle from "xlsx-js-style"
import { TicketRegisterStepThreePicture } from "./interfaces/Ticket.interface";

export function checkIfNotNullOrEmpty(value: any) {
  if (value !== null && value !== '') return true;
  if (value == null && value == '') return false;
}

export function getCurrentDate(): string {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()

  const currentDate = (day.toString() + '/' + month.toString() + '/' + year.toString())

  return currentDate
}

export function dataURLtoFile(dataurl) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], '', { type: mime });
}

export function loopPictures(pictures: string[], filePurpose: string) {
  const pictureList: TicketRegisterStepThreePicture[] = [];

  for (const picture of pictures) {
    const pic: TicketRegisterStepThreePicture = {
      Content: picture,
      FilePurpose: filePurpose
    }
    pictureList.push(pic)
  }
  return pictureList;
}

export const generateTableHTML = (serviceList: any[]) => {
  let tableRows = '';

  serviceList.forEach((service) => {
    tableRows += `
        <tr>
          <td>${service.Name}</td>
          <td>$${service.Cost}</td>
        </tr>
      `;
  });

  const tableHTML = `
      <table border="1">
        <thead>
          <tr>
            <th>Nombre del Servicio</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;

  return tableHTML;
};

export function generateRegisterTicketMail(user: string, company: string, link: string) {
  const html = `<p>Se ha registrado un nuevo ticket por parte del usuario <strong>${user}</strong> de la empresa <strong>${company}</strong>.</p> </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-footer.jpg?t=2023-12-15T16%3A01%3A39.800Z">`

  return html
}

export function generateAssignTicketMail(idTechnician: string | null, scheduledAppointmentDate: Date, ScheduledAppointmentTime: Date, company: string, address: string, floor: string, link: string) {
  const html = `<p>Se ha asignado ${idTechnician == null
    ? "a un técnico de garantía"
    : "al técnico <strong>" + idTechnician
    }</strong>. Asimismo, se programó una visita para el <strong>${moment(
      scheduledAppointmentDate
    ).format("DD/MM/YYYY")}</strong> a las <strong>${moment(
      ScheduledAppointmentTime
    ).format("HH:MM")}</strong> en <strong>${company} - ${address
    } - Piso ${floor
    }</strong>. </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-footer.jpg?t=2023-12-15T16%3A01%3A39.800Z">`

  return html
}

export function generateMailNotFacturable(user: string, company: string, isFacturable: boolean, requiresOrder: boolean) {
  const html = `<p>Se ${isFacturable ? 'atendió' : 'dio por finalizado'} el ticket del usuario <strong>${user}</strong> en la empresa <strong>${company}</strong>. ${requiresOrder && isFacturable ? 'La empresa <strong>requiere orden de compra</strong>' : ''} Se adjunta el documento PDF para ver un mayor detalle.</p> </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-footer.jpg?t=2023-12-15T16%3A01%3A39.800Z" alt="">`

  return html
}

export function generateMailFacturable(user: string, company: string) {
  const html = `<p>Se atendió el ticket del usuario <strong>${user}</strong> en la empresa <strong>${company}</strong>.</p> </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-footer.jpg?t=2023-12-15T16%3A01%3A39.800Z" alt="">`

  return html
}

export function generateMailFacturableWithServices(user: string, company: string, servicesTable: string, total: number) {
  const html = `<p>Se envía el costo y detalle del servicio de ticket del usuario <strong>${user}</strong> en la empresa <strong>${company}</strong>.</p> </br></br> Se adjunta el documento PDF para ver un mayor detalle como también el detalle de costos del servicio.</p> </br></br> ${servicesTable} </br></br></br> <strong>El costo total del servicio es: $${total} (No incluye IGV)</strong></br></br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-footer.jpg?t=2023-12-15T16%3A01%3A39.800Z" alt="">`

  return html
}

export function generateMailFacturableWithServicesUserResponse(user: string, company: string, servicesTable: string, total: number, response: boolean, requiresOrder: boolean) {
  const html = `<p>El usuario <strong>${user}</strong> de la empresa <strong>${company}</strong> ${response ? 'aceptó' : 'rechazó'} la cotización del servicio, por lo que el ticket ${response ? 'ha finalizado' : 'quedará abierto'}.</p> ${requiresOrder && response ? 'La empresa <strong>requiere orden de compra</strong>' : ''}. </br></br> Se adjunta el documento PDF para ver un mayor detalle como también el detalle de costos del servicio.</p> </br></br> ${servicesTable} </br></br></br> <strong>El costo total del servicio es: $${total} (No incluye IGV)</strong></br></br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-footer.jpg?t=2023-12-15T16%3A01%3A39.800Z" alt="">`

  return html
}

export const exportData = (tickets) => {
  const output_data = tickets.map((entry) => ({
    CODIGO: entry.CodeTicket,
    ESTADO: entry?.Status,
    FECHA: entry?.RecordCreationDate,
    FECHAATENCION: entry?.AppointmentDate ? entry?.AppointmentDate : '',
    EMPRESA: entry?.Company,
    DIRECCION: entry?.CompanyAddress ? entry?.CompanyAddress : entry?.Address,
    LOCAL: entry?.CompanyLocal ? entry?.CompanyLocal : entry?.Local,
    PISO: entry?.Floor,
    AREA: entry?.Area,
    FALLAREPORTADA: entry?.ReportedFailure,
    FALLAENCONTRADA: entry?.FoundFailure,
    EQUIPO1: entry?.DeviceOne,
    NS1: entry?.SeriesNumberOne,
    CONTADOR1: entry?.CounterOne,
    GUIA1: entry?.GuideOne,
    EQUIPO2: entry?.DeviceTwo,
    NS2: entry?.SeriesNumberTwo,
    CONTADOR2: entry?.CounterTwo,
    GUIA2: entry?.GuideTwo,
    COMENTARIO: entry?.Comment,
    RECOMENDACION: entry?.Recommendation,
    SERVICIO: entry?.Type,
    TECNICO: entry?.Technician == null ? 'Técnico de Garantía' : entry?.Technician
  }))

  const wb = XLSXStyle.utils.book_new()


  const wsData = XLSXStyle.utils.json_to_sheet(output_data)

  const header = [
    "ID del Ticket",
    "Código del Ticket",
    "Estado del Ticket",
    "ID de la Compañía del Ticket",
    "Fecha de Creación del Registro",
    "Nombre de la Compañía",
    "ID de la Compañía del Ticket",
    "Fecha de Creación del Registro",
    "Nombre de la Compañía",
    "Nombre de la Compañía",
    "ID de la Compañía del Ticket",
    "Fecha de Creación del Registro",
    "Nombre de la Compañía",
    "ID de la Compañía del Ticket",
    "Fecha de Creación del Registro",
    "Nombre de la Compañía",
    "Nombre de la Compañía",
    "Nombre de la Compañía",
    "Fecha de Creación del Registro",
    "Nombre de la Compañía",
    "Nombre de la Compañía",
    "Nombre de la Compañía",
  ]
  const data = [
    header,
    ...XLSXStyle.utils.sheet_to_json(wsData),
  ]

  const headerStyle = {
    font: { color: { rgb: "FFFFFF" }, bold: true },
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "70AD47" } },
  }

  // Aplicar estilos a la fila de encabezados
  header.forEach((_, colIndex) => {
    const cellAddress = XLSXStyle.utils.encode_cell({ r: 0, c: colIndex })
    wsData[cellAddress].s = headerStyle
  })

  const dataStyles = [
    {
      fill: { fgColor: { rgb: "E2EFDA" } },
      border: {
        top: { style: "thin", color: { rgb: "E2EFDA" } },
        left: { style: "thin", color: { rgb: "E2EFDA" } },
        bottom: { style: "thin", color: { rgb: "E2EFDA" } },
        right: { style: "thin", color: { rgb: "E2EFDA" } },
      },
    },
    {
      fill: { fgColor: { rgb: "FFFFFF" } },
      border: {
        top: { style: "thin", color: { rgb: "E2EFDA" } },
        left: { style: "thin", color: { rgb: "E2EFDA" } },
        bottom: { style: "thin", color: { rgb: "E2EFDA" } },
        right: { style: "thin", color: { rgb: "E2EFDA" } },
      },
    },
  ]

  for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
    const styleIndex = rowIndex % 2
    Object.keys(data[rowIndex]).forEach((key, colIndex) => {
      const cellAddress = XLSXStyle.utils.encode_cell({
        r: rowIndex,
        c: colIndex,
      })
      wsData[cellAddress] = {
        ...wsData[cellAddress],
        s: dataStyles[styleIndex],
      }
    })
  }

  const columnWidths = header.map((_) => ({ wch: 20 }))
  wsData["!cols"] = columnWidths

  XLSXStyle.utils.book_append_sheet(wb, wsData, "reporte")

  XLSXStyle.writeFile(wb, `ReporteIncidencias.xlsx`)
}

export function procesarCadena(cadena) {
  const partes = cadena.split(' ');

  if (partes.length >= 2) {
    const dosPrimerosDigitos = partes[0].slice(0, 2);

    const restoCodigo = partes.slice(1).join(' ');

    const resultado = dosPrimerosDigitos + restoCodigo;

    return resultado;
  } else {
    return cadena;
  }
}

export function combinarValores(valores: (string | undefined)[]): string {
  const combinados: string[] = [];

  for (let i = 0; i < valores.length; i += 2) {
    if (valores[i] !== undefined && valores[i + 1] !== undefined) {
      combinados.push(`${valores[i]}: ${valores[i + 1]}`);
    }
  }

  return combinados.join(', ');
}