import moment from "moment";
import XLSXStyle from "xlsx-js-style"
import { TicketRegisterStepThreePicture } from "./interfaces/Ticket.interface";
import { ConstantFilePurpose } from "./constants";
import heic2any from 'heic2any';

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

export async function dataURLtoFile(dataurl, filename = 'image.jpg') {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error('MIME no detectado.');

  const mime = mimeMatch[1];
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  let file = new File([u8arr], filename, { type: mime });

  const isSuspectHeic = mime === 'application/octet-stream';
  // Si es HEIC/HEIF, conviértelo a JPEG
  if (mime === 'image/heic' || mime === 'image/heif' || isSuspectHeic) {
    console.log('Convirtiendo HEIC a JPEG...');

    try {
      const conversionResult = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8,
      });

      file = new File(
        [conversionResult],
        filename.replace(/\.(heic|heif)$/i, '.jpg'),
        { type: 'image/jpeg' },
      );
      console.log('¡Conversión exitosa!');
    } catch (err) {
      console.error('Error al convertir HEIC:', err);
      throw err;
    }
  }

  return file;
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

export function generateRegisterTicketMail(user: string, company: string, idTicket: string, imageTable: string) {
  const html = `<p>Se ha registrado el <strong>ticket ${idTicket}</strong> por parte del usuario <strong>${user}</strong> de la empresa <strong>${company}</strong>.</p> </br></br></br> ${imageTable} </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-qs.jpg">`

  return html
}

export function generateAssignTicketMail(idTicket: string, idTechnician: string | null, scheduledAppointmentDate: Date, ScheduledAppointmentTime: Date, company: string, local: string, address: string, floor: string, imageTable: string) {
  const html = `<p>Se ha asignado ${idTechnician == null
    ? "a un técnico de garantía"
    : "al técnico <strong>" + idTechnician
    }</strong> al <strong>ticket ${idTicket}</strong>. Asimismo, se programó una visita para el <strong>${moment(
      scheduledAppointmentDate
    ).format("DD/MM/YYYY")}</strong> a las <strong>${moment(
      ScheduledAppointmentTime
    ).format("HH:MM")}</strong> en <strong>${company} - ${local} - ${address
    } - Piso ${floor
    }</strong>. </br></br></br> ${imageTable} </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-qs.jpg">`

  return html
}

export function generateMailNotFacturable(user: string, company: string, isFacturable: boolean, requiresOrder: boolean, idTicket: string, imageTable: string) {
  const html = `<p>Se ${isFacturable ? 'atendió' : 'dio por finalizado'} el <strong>ticket ${idTicket}</strong> del usuario <strong>${user}</strong> en la empresa <strong>${company}</strong>. ${requiresOrder && isFacturable ? 'La empresa <strong>requiere orden de compra</strong>' : ''} Se adjunta el documento PDF para ver un mayor detalle.</p> </br></br></br> ${imageTable} </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-qs.jpg" alt="">`

  return html
}

// export function generateMailFacturable(user: string, company: string, idTicket: string) {
//   const html = `<p>Se atendió el <strong>ticket ${idTicket}</strong>  del usuario <strong>${user}</strong> en la empresa <strong>${company}</strong>.</p> </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-qs.jpg" alt="">`

//   return html
// }

export function generateMailFacturableWithServices(idTicket: string, user: string, company: string, servicesTable: string, total: number, isWaiting: boolean, imageTable: string) {
  const html = `<p>Se envía la cotización ${isWaiting ? ' actualizada' : ' '}y detalle del servicio de ticket ${idTicket} del usuario <strong>${user}</strong> en la empresa <strong>${company}</strong>.</p> </br></br> Se adjunta el documento PDF para ver un mayor detalle como también el detalle de costos del servicio.</p> </br></br> ${servicesTable} </br></br></br> <strong>El costo total del servicio es: $${total} (No incluye IGV)</strong></br></br></br> ${imageTable} </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-qs.jpg" alt="">`

  return html
}

export function generateMailFacturableWithServicesUserResponse(idTicket: string, user: string, company: string, servicesTable: string, total: number, response: boolean, requiresOrder: boolean, imageTable: string) {
  const html = `<p>El usuario <strong>${user}</strong> de la empresa <strong>${company}</strong> ${response ? 'aceptó' : 'rechazó'} la cotización del servicio, por lo que el ticket <strong>${idTicket}</strong> ${response ? ' ha finalizado' : 'quedará abierto'}.</p> ${requiresOrder && response ? 'La empresa <strong>requiere orden de compra.</strong>' : ''} </br></br> Se adjunta el documento PDF para ver un mayor detalle como también el detalle de costos del servicio.</p> </br></br> ${servicesTable} </br></br></br> <strong>El costo total del servicio es: $${total} (No incluye IGV)</strong></br></br></br> ${imageTable} </br></br></br> <img src="https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/mail/mail-qs.jpg" alt="">`

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

export function generateImageTable(images: any[]) {
  const baseUrl = "https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/";

  // Filtrar imágenes por propósito
  const evidencias = images.filter(image => image.FilePurpose === ConstantFilePurpose.IMAGEN_USUARIO);
  const evidenciasTecnico = images.filter(image => image.FilePurpose === ConstantFilePurpose.IMAGEN_TECNICO);

  // Función para generar una tabla HTML con las imágenes
  const createTable = (images: any[], title: string) => {
    if (images.length === 0) return ""; // No mostrar si no hay imágenes

    let tableContent = "";
    let rowContent = "";

    // Mapear las imágenes en filas de máximo 3 columnas
    images.forEach((image, index) => {
      const fullUrl = baseUrl + image.FileUrl;

      // Crear una celda con la imagen
      rowContent += `
        <td style="text-align: center; padding: 10px;">
          <img style="width: 200px; height: 200px; object-fit: contain;" src="${fullUrl}" alt="Evidencia">
        </td>
      `;

      // Cada 3 imágenes, cerrar la fila y abrir una nueva
      if ((index + 1) % 3 === 0) {
        tableContent += `<tr>${rowContent}</tr>`;
        rowContent = ""; // Reiniciar la fila
      }
    });

    // Si quedan imágenes al final que no completan una fila, cerrarla
    if (rowContent) {
      tableContent += `<tr>${rowContent}</tr>`;
    }

    return `
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr>
            <th colspan="3" style="text-align: left;">${title}:</th>
          </tr>
        </thead>
        <tbody>
          ${tableContent}
        </tbody>
      </table>
    `;
  };

  // Generar tablas para las dos categorías
  const evidenciasTable = createTable(evidencias, "Evidencias");
  const evidenciasTecnicoTable = createTable(evidenciasTecnico, "Evidencias del técnico");

  // Devolver ambas tablas si existen
  return `${evidenciasTable}${evidenciasTecnicoTable}`;
}