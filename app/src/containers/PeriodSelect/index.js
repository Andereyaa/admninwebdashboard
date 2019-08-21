import React, {Component} from 'react'

import * as actions from '../../actions'
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {shouldLoadMilkCollectionsForCenter} from "../../utils/dataLoading"
import {getMomentLocalToSelectedCountry} from "../../utils/dateHandling"
import PeriodPicker from '../../components/PeriodPicker'
import {trackEvent} from "../../config/googleAnalytics"

export class PeriodSelect extends Component {

    handleSelectPeriod = async id => {
        const {actions, periods, centers, institution} = this.props
        const selectedPeriod = periods.periodsById[id]
        //if the data for this center has not been loaded before or it was last loaded
        //or it was last loaded over a day ago 
        if ( shouldLoadMilkCollectionsForCenter(selectedPeriod, periods, centers.selectedId)){ 
            actions.toggleLoading(true)
            const success = await actions.fetchMilkCollections(
                centers.selectedId,
                selectedPeriod
            )
            actions.toggleLoading(false)
            if (success) actions.selectPeriod(id)
        }
        else actions.selectPeriod(id)
        const periodStartDate = getMomentLocalToSelectedCountry(selectedPeriod.startDate)
        const periodEndDate = getMomentLocalToSelectedCountry(selectedPeriod.endDate)
        const formatString = "Do MMMM YYYY"
        trackEvent(
            'Data Consumption',
            'Changed Period',
            `Selected Period starting ${periodStartDate.format(formatString)} and ending ${periodEndDate.format(formatString)} at Institution "${institution.institutionName}"`
        )
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
    centers: state.centers,
    institution: state.institution
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(PeriodSelect)