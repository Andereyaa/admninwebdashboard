import React, {Component} from 'react'

import * as actions from '../../actions'
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {DAY_IN_MILLISECONDS} from '../../constants/time'
import PeriodPicker from '../../components/PeriodPicker'

export class PeriodSelect extends Component {

    handleSelectPeriod = async id => {
        const {actions, periods, centers} = this.props
        const selectedPeriod = periods.periodsById[id]
        //if the data for this center has not been loaded before or it was last loaded
        //or it was last loaded over a day ago 
        if (
            !selectedPeriod.dateLoadedByCenterId[centers.selectedId] ||
            selectedPeriod.dateLoadedByCenterId[centers.selectedId] < (Date.now() - DAY_IN_MILLISECONDS)
        ){ 
            actions.toggleLoading(true)
            const success = await actions.fetchMilkCollections(
                centers.selectedId,
                selectedPeriod
            )
            actions.toggleLoading(false)
            if (success) actions.selectPeriod(id)
        }
        else actions.selectPeriod(id)
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
    periods: state.periods,
    centers: state.centers
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(PeriodSelect)