import React, {Component} from 'react'

import {connect} from "react-redux"

import PeriodPicker from '../../components/PeriodPicker'

export class PeriodSelect extends Component {
    render(){
        const {periods} = this.props
        const periodsArray = periods.periodIds.map(periodId => periods.periodsById[periodId])
        return <PeriodPicker periods={periodsArray}/>
    }
}

const mapStateToProps = state => ({
    periods: state.periods
})
export default connect(mapStateToProps)(PeriodSelect)