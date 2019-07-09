import React, {Component} from 'react'

import PeriodSelect from '../../containers/PeriodSelect'
import PeriodReportTable from '../../containers/PeriodReportTable'

import {connect} from 'react-redux'

export class DashboardPeriodView extends Component {
    render(){
        const {periods} = this.props
        const selectedPeriod = periods.selectedId ? periods.periodsById[periods.selectedId] : null
        return (
        <div>
            <PeriodSelect />
            {
                selectedPeriod ?
                <PeriodReportTable selectedPeriod={selectedPeriod}/>
                :
                null
            }
        </div>
        )
    }
}

const mapStateToProps = state => ({
    periods: state.periods
})
export default connect(mapStateToProps)(DashboardPeriodView)