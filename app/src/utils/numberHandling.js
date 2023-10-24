export const getIntegerRange = (startNumber, endNumber) => {
    if (startNumber > endNumber) throw Error("start number cannot be bigger than end number")
    const count = endNumber - startNumber + 1
    const range = [...Array(count).keys()].map(num => num + startNumber)
    return range
} 