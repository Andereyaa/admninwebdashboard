import React, {Component} from "react"
import styles from "./PeriodReportTable.module.css"

import {connect} from "react-redux"
import moment from "moment"

import PeriodReportTableRow from "../../components/PeriodReportTableRow"
import {getIntegerRange} from '../../utils/numberHandling'
import {integerToOrdinalNumber} from '../../utils/dateHandling'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'
export class PeriodReportTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            selectedPeriod: this.findPeriodRangeForDate(Date.now()),
        }
    }

    findPeriodRangeForDate = timestamp => {
        const dateInRange = moment(timestamp)
        const day = dateInRange.date()
        const periodRange = {}
        if (day <=15) { 
            periodRange.startDate = moment([dateInRange.year(), dateInRange.month(), 1])
            periodRange.endDate = moment([dateInRange.year(), dateInRange.month(), 15])
        } else {
            periodRange.startDate = moment([dateInRange.year(), dateInRange.month(), 16])
            periodRange.endDate = moment(dateInRange).endOf('month');
        }
        return periodRange
    }

    getPeriodHeaders = () => {
        const {startDate, endDate} = this.state.selectedPeriod
        const dayArray = getIntegerRange(startDate.date(), endDate.date())
        const ordinalNumbers = dayArray.map(dayInteger => integerToOrdinalNumber(dayInteger))
        const summaryHeaders =["Total", "Price", "Amount"]
        return( 
            <tr>
                {ordinalNumbers.map(header => <th key={header}>{header}</th>)}
                {summaryHeaders.map(header => <th key={header} className={styles.summaryHeader}>{header}</th>)}
            </tr>
        )
    }
    getPeriodRows = supplierIds => {
        const {selectedPeriod} = this.state
        const {suppliers, milkCollections, centers} = this.props
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
                            const dateCollected = moment(milkCollection.dateCollected)
                            const day = dateCollected.date()
                            if (!milkCollectionsByDate[day]) milkCollectionsByDate[day] = []
                            milkCollectionsByDate[day].push(milkCollection)
                        }
                    }
                )   
            }
            return <PeriodReportTableRow 
                        key={supplierId} 
                        supplier={supplier} 
                        milkCollectionsByDate={milkCollectionsByDate}
                        periodStartDate={selectedPeriod.startDate}
                        periodEndDate={selectedPeriod.endDate}
                    />
        })
    }
    render(){
        const {milkCollectionsArray, suppliers, centers} = this.props
        const {selectedPeriod} = this.state
        if (!centers || !centers.selectedId) return null
        if (!suppliers) return null
        //TODO pull out suppliers by center from redux, need to keep all suppliers in state across center changes
        //temporarily use all suppliers as it works for now
        return (
          <div className={styles.container}>
            <table className={styles.supplierTable}>
                <thead>
                    <tr><th className={styles.supplierHeader}>Suppliers</th></tr>
                </thead>
                <tbody>
                {suppliers.supplierIds.map(supplierId => <tr><td key={supplierId} className={styles.supplierData}>{capitalizeFirstLetterOfAllWords(suppliers.suppliersById[supplierId].supplierName)}</td></tr>)}
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
        )
    }
}


const mapStateToProps = state => ({
    suppliers: state.suppliers,
    centers: state.centers,
    milkCollections: state.milkCollections
})

export default connect(mapStateToProps)(PeriodReportTable)