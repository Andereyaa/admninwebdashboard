import React, {Component} from "react"
import styles from "./PeriodReportTable.module.css"

import {connect} from "react-redux"

import {COMPANY_NAME} from "../../constants/companyInfo"
import PeriodReportTableRow from "../../components/PeriodReportTableRow"
import Button from '../../components/Button'

import {getIntegerRange} from '../../utils/numberHandling'
import {integerToOrdinalNumber, getMomentLocalToSelectedCountry} from '../../utils/dateHandling'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

import xlsx from 'xlsx'

export class PeriodReportTable extends Component {

    supplierHeaderName = "Supplier Name"
    summaryHeaderNames =["Total", "Price", "Amount"]

    getDateHeaderNamesForPeriod = () => {
        const {selectedPeriod} = this.props
        const startDate = getMomentLocalToSelectedCountry(selectedPeriod.startDate)
        //TODO revisit in tests across timezones to ensure dates do not cause crash -1 fix
        const endDate = getMomentLocalToSelectedCountry(selectedPeriod.endDate - 1)
        const dayArray = getIntegerRange(startDate.date(), endDate.date())
        return dayArray.map(dayInteger => integerToOrdinalNumber(dayInteger))
    }

    getPeriodHeaders = () => {  
        const ordinalNumbers = this.getDateHeaderNamesForPeriod() 
        return( 
            <tr>
                {ordinalNumbers.map(header => <th key={header}>{header}</th>)}
                {this.summaryHeaderNames.map(header => <th key={header} className={styles.summaryHeader}>{header}</th>)}
            </tr>
        )
    }
    getPeriodRows = supplierIds => {
        const {suppliers, milkCollections, centers, selectedPeriod} = this.props
        //for each supplier
        return supplierIds.map(supplierId => {
            const supplier = suppliers.suppliersById[supplierId]
            //get its milk collections
            const milkCollectionIds = milkCollections.milkCollectionIdsBySupplierId[supplierId]
            const milkCollectionsByDate = {}
            if (milkCollectionIds) {
                milkCollectionIds.forEach(
                    milkCollectionId => {
                        const milkCollection = milkCollections.milkCollectionsById[milkCollectionId]
                        if (milkCollection.dateCollected >= selectedPeriod.startDate &&
                            milkCollection.dateCollected <= selectedPeriod.endDate && 
                            milkCollection.centerId === centers.selectedId    
                        ){
                            const dateCollected = getMomentLocalToSelectedCountry(milkCollection.dateCollected)
                            const day = dateCollected.date()
                            if (!milkCollectionsByDate[day]) milkCollectionsByDate[day] = []
                            milkCollectionsByDate[day].push(milkCollection)
                        }
                    }
                )   
            }
            return <PeriodReportTableRow 
                        key={supplierId} 
                        supplierId={supplierId} 
                        milkCollectionsByDate={milkCollectionsByDate}
                        periodStartDate={selectedPeriod.startDate}
                        periodEndDate={selectedPeriod.endDate}
                    />
        })
    }

    generateReport = () => {
        const {suppliers, milkCollections, centers, selectedPeriod, institution} = this.props
        const center = centers.centersById[centers.selectedId]
        const format = "Do MMMM YYYY"
        const title = `${capitalizeFirstLetterOfAllWords(institution.institutionName)} - ${capitalizeFirstLetterOfAllWords(center.centerName)} Report - ${getMomentLocalToSelectedCountry(selectedPeriod.startDate).format(format)} to ${getMomentLocalToSelectedCountry(selectedPeriod.endDate).format(format)}`
        const workbook = xlsx.utils.book_new()
        workbook.Props = {
            Title: title,
            Subject: "Period Report",
            Author: COMPANY_NAME,
            CreatedDate: new Date()
        }
        workbook.SheetNames.push("Period Report")
    
        const headerNamesForPeriod = this.getDateHeaderNamesForPeriod()
        const header = [this.supplierHeaderName].concat(headerNamesForPeriod).concat(this.summaryHeaderNames)
        const data = []
        
        //create the object that will track the totals for each day
        const dailyTotals = {[this.supplierHeaderName]: "TOTAL"}
        dailyTotals[this.summaryHeaderNames[0]] = 0
        dailyTotals[this.summaryHeaderNames[1]] = 0
        dailyTotals[this.summaryHeaderNames[2]] = 0
        headerNamesForPeriod.forEach(headerName => dailyTotals[headerName] = 0)

        //TODO change this when suppliers from multiple centers can be in redux
        const startDateTimestamp = selectedPeriod.startDate
        const endDateTimestamp = selectedPeriod.endDate - 1
        suppliers.supplierIds.forEach(supplierId => {
            const supplier = suppliers.suppliersById[supplierId]
            const dataRow = {[this.supplierHeaderName]: capitalizeFirstLetterOfAllWords(supplier.supplierName)}
            //set every date to the value 0
            let total = 0
            let sumPrice = 0
            let count = 0 
            headerNamesForPeriod.forEach(headerName => dataRow[headerName] = 0)
            const milkCollectionIds = milkCollections.milkCollectionIdsBySupplierId[supplierId]
            if (milkCollectionIds){
                //if the supplier has milk collections
                milkCollectionIds.forEach(milkCollectionId => {
                    //loop through each id
                    const milkCollection = milkCollections.milkCollectionsById[milkCollectionId]
                    if (milkCollection.dateCollected >= startDateTimestamp &&
                        milkCollection.dateCollected <= endDateTimestamp &&
                        milkCollection.centerId === centers.selectedId)
                        {
                            //if the milk collection is in the right date range for the right center
                            //get the ordinal number as an index
                            const dateCollected = getMomentLocalToSelectedCountry(milkCollection.dateCollected)
                            const ordinalNumber = integerToOrdinalNumber(dateCollected.date())
                            //add the volumeInLitres of the current milk collection to the day
                            dataRow[ordinalNumber] += milkCollection.volumeInLitres
                            //add the volumeInLitres to the daily total
                            dailyTotals[ordinalNumber] += milkCollection.volumeInLitres
                            total += milkCollection.volumeInLitres
                            sumPrice += milkCollection.rateInShillings
                            count += 1 
                        }
                })
            }
            const avgPrice = count > 0 ? sumPrice/count : 0
            dataRow[this.summaryHeaderNames[0]] = total
            dataRow[this.summaryHeaderNames[1]] = avgPrice
            dataRow[this.summaryHeaderNames[2]] = avgPrice * total
            //add it to the daily totals
            dailyTotals[this.summaryHeaderNames[0]] += total
            dailyTotals[this.summaryHeaderNames[2]] += avgPrice * total
            data.push(dataRow)
        })
        //add the daily totals row
        dailyTotals[this.summaryHeaderNames[1]] = (dailyTotals[this.summaryHeaderNames[0]] === 0) ? 0 : dailyTotals[this.summaryHeaderNames[2]]/dailyTotals[this.summaryHeaderNames[0]]
        data.push(dailyTotals)
        const worksheet = xlsx.utils.json_to_sheet(data, {header})
        workbook.Sheets["Period Report"] = worksheet
        xlsx.writeFile(workbook, `${title}.xlsx`)
    } 

    render(){
        const {suppliers, centers} = this.props
        if (!centers || !centers.selectedId) return null
        if (!suppliers) return null
        //TODO pull out suppliers by center from redux, need to keep all suppliers in state across center changes
        //temporarily use all suppliers as it works for now
        return (
          <div className={styles.container}>
            <div className={styles.tableTop}>
                <Button text="Download Report" onClick={this.generateReport}/>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.supplierTable}>
                    <thead>
                        <tr><th className={styles.supplierHeader}>{this.supplierHeaderName}</th></tr>
                    </thead>
                    <tbody>
                    {suppliers.supplierIds.map(supplierId => <tr key={`${supplierId}SupplierRow` } className={styles.supplierRow}><td className={styles.supplierData}>{capitalizeFirstLetterOfAllWords(suppliers.suppliersById[supplierId].supplierName)}</td></tr>)}
                    </tbody>
                </table>
                <div className={styles.milkRecordTableContainer}>
                <table className={styles.milkRecordTable}>
                    <thead>
                        {
                            this.getPeriodHeaders()
                        }
                    </thead>
                    <tbody>
                    {
                        this.getPeriodRows(suppliers.supplierIds)
                    }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        )
    }
}


const mapStateToProps = state => ({
    suppliers: state.suppliers,
    centers: state.centers,
    milkCollections: state.milkCollections,
    institution: state.institution
})

export default connect(mapStateToProps)(PeriodReportTable)