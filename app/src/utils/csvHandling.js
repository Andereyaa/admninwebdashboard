import {parse} from 'papaparse'

export const parseCsvStringToNewSuppliers = csvString => {
    const results = parse(csvString)
    const newSuppliers = []
    results.data.forEach(supplierData => {
        if (supplierData.length >= 3){
            const newSupplier = {}
            newSupplier.supplierName = supplierData[0] ? supplierData[0] : null
            newSupplier.phoneNumber = supplierData[1] ? supplierData[1] : null
            newSupplier.locationName = supplierData[2] ? supplierData[2] : null
            newSuppliers.push(newSupplier)
        }
    })
    return newSuppliers
}