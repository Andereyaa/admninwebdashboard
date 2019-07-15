import React, {Component} from 'react'

import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import * as actions from "../../actions"

import DatePicker from '../../components/DatePicker'

import {shouldLoadMilkCollectionsForCenter} from "../../utils/dataLoading"
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'
import {findPeriodRangeForDate, getMomentLocalToSelectedCountry} from '../../utils/dateHandling'
export class CenterDateSelect extends Component {

    constructor(props){
        super(props)
        const {periods} = this.props
        const firstPeriodId = periods.periodIds[0]
        const firstPeriod = periods.periodsById[firstPeriodId]
        this.state = {
            today: getMomentLocalToSelectedCountry(),
            registrationDate: getMomentLocalToSelectedCountry(firstPeriod.startDate)
        }
    }

    handleSelect = async date => {
        const {onSelect, periods, centers, actions} = this.props
        const momentPeriod = findPeriodRangeForDate(date.valueOf())
        const periodId = momentPeriod.startDate.valueOf()
        const selectedPeriod = periods.periodsById[periodId]
        if (!selectedPeriod) return //TODO throw appropriate error here
        if( shouldLoadMilkCollectionsForCenter(selectedPeriod, periods, centers.selectedId)){
            actions.toggleLoading(true)
            await actions.fetchMilkCollections(centers.selectedId, selectedPeriod)
            actions.toggleLoading(false)
        }
        onSelect(date)
    }

    render(){
        const {centers, value} = this.props
        const {today, registrationDate} = this.state
        const centerName = centers.selectedId ?
                            centers.centersById[centers.selectedId].centerName
                            :
                            ""
        return (
            <React.Fragment>
                {
                    centers.selectedId ?
                    <div>
                        {`${capitalizeFirstLetterOfAllWords(centerName)} Daily Milk Records for `} 
                        <DatePicker value={value} onSelect={this.handleSelect} max={today} min={registrationDate}/>
                    </div>
                    :
                    null
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    periods: state.periods
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CenterDateSelect)