import React, {Component} from 'react'

import PeriodSelect from '../../containers/PeriodSelect'
import PeriodReportTable from '../../containers/PeriodReportTable'

import {connect} from 'react-redux'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export class DashboardPeriodView extends Component {
    render(){
        const {periods, centers} = this.props
        const selectedPeriod = periods.selectedId ? periods.periodsById[periods.selectedId] : null
        const selectedCenter = centers.selectedId ? centers.centersById[centers.selectedId] : null
        return (
        <div>
            {
                selectedCenter ?
                <div>
                    {`${capitalizeFirstLetterOfAllWords(selectedCenter.centerName)} Milk Records from `} <PeriodSelect />
                </div>
                :
                null
            }
            {
                selectedCenter && selectedPeriod ?
                <PeriodReportTable selectedPeriod={selectedPeriod}/>
                :
                null
            }
        </div>
        )
    }
}

const mapStateToProps = state => ({
    periods: state.periods,
    centers: state.centers
})
export default connect(mapStateToProps)(DashboardPeriodView)