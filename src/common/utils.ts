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