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

