import React, {Component} from "react"

import {connect} from "react-redux"
import moment from "moment"

  {/* <div>{milkCollectionsArray.map(m => <div>{m.id}</div>)}</div> */}
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
                    suppliers.supplierIds.map(supplierId => {
                        const supplier = suppliers.suppliersById[supplierId]
                        return <PeriodTableRow supplier={supplier} />
                    })
                }
            </div>
        )
    }
}

const PeriodTableRow = ({supplier}) => (
    <div>
        {supplier.supplierName}
    </div>
)
const mapStateToProps = state => ({
    suppliers: state.suppliers,
    centers: state.centers
})

export default connect(mapStateToProps)(PeriodReportTable)