import React, {Component} from "react"

import {connect} from "react-redux"
import moment from "moment"

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
            return <PeriodTableRow 
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
        console.log(selectedPeriod)
        if (!centers || !centers.selectedId) return null
        if (!suppliers) return null
        //TODO pull out suppliers by center from redux, need to keep all suppliers in state across center changes
        //temporarily use all suppliers as it works for now
        return (
          
            <div>
                {
                    this.getPeriodRows(suppliers.supplierIds)
                }
            </div>
        )
    }
}

const PeriodTableRow = ({supplier, milkCollectionsByDate = {}, periodStartDate, periodEndDate}) => {
    const numberOfDays = periodEndDate.date() - periodStartDate.date() + 1
    const dayArray = [...Array(numberOfDays).keys()].map(day => day + periodStartDate.date())
    let totalVolume = 0
    let sumPrice = 0
    let milkCollectionCount = 0
    Object.keys(milkCollectionsByDate).forEach(day => {
        const milkCollections = milkCollectionsByDate[day]
        milkCollections.forEach(milkCollection => {
            totalVolume = totalVolume + milkCollection.volumeInLitres
            sumPrice = sumPrice + milkCollection.rateInShillings
            milkCollectionCount += 1
        })
    })
    const avgPrice = milkCollectionCount > 0 ? sumPrice/milkCollectionCount : 0
    const amount = milkCollectionCount > 0 ? avgPrice * totalVolume : 0
    return (
    <div>
        {supplier.supplierName}
        {
        dayArray.map(day => {
            const dailyTotal = milkCollectionsByDate[day] ? milkCollectionsByDate[day][0].volumeInLitres : 0     
            return <span>{dailyTotal}</span>
        })
        }
        <span>total: {totalVolume}</span>
        <span>price: {avgPrice}</span>
        <span>amount: {amount}</span>
    </div>
    )
}
const mapStateToProps = state => ({
    suppliers: state.suppliers,
    centers: state.centers,
    milkCollections: state.milkCollections
})

export default connect(mapStateToProps)(PeriodReportTable)