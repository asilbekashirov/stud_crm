export function fDate(date: Date): string {

    let formattedDate: string = ""

    if (date instanceof Date) {
        dateFormat(date)
    } else {
        const newFormatDate = new Date(date)
        dateFormat(newFormatDate)
    }

    function dateFormat(dateObj: Date) {
        const month = dateObj.getMonth() + 1
        const day = dateObj.getDate()
        const year = dateObj.getFullYear()

        formattedDate = `${month}/${day}/${year}`
    }

    return formattedDate
}