export function fDate(date: Date | string): string {

    let formattedDate: string = ""

    if (date instanceof Date) {
        dateFormat(date)
    } else {
        const newFormatDate = new Date(date)
        dateFormat(newFormatDate)
    }

    function dateFormat(dateObj: Date) {
        const month = String(dateObj.getMonth() + 1)
        const day = String(dateObj.getDate())
        const year = String(dateObj.getFullYear())

        formattedDate = `${month.length === 1 ? "0"+month : month}/${day.length === 1 ? "0"+day : day}/${year}`
    }

    return formattedDate
}