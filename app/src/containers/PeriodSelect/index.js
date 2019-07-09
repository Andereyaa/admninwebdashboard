import React, {Component} from 'react'

import * as actions from '../../actions'
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'

import PeriodPicker from '../../components/PeriodPicker'

export class PeriodSelect extends Component {

    handleSelectPeriod = id => {
        const {actions} = this.props
        actions.selectPeriod(id)
    }

    render(){
        const {periods} = this.props
        const periodsArray = periods.periodIds.map(periodId => periods.periodsById[periodId]).reverse()
        return <PeriodPicker 
                    periods={periodsArray}
                    selectedId={periods.selectedId}
                    onSelect={this.handleSelectPeriod}
                />
    }
}

const mapStateToProps = state => ({
    periods: state.periods
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(PeriodSelect)