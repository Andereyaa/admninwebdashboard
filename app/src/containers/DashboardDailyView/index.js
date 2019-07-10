import React, {Component, Fragment} from 'react'

import DailyStatisticsPanel from '../../containers/DailyStatisticsPanel'
import MilkCollectionsTable from '../../containers/MilkCollectionsTable'
import CenterDateSelect from '../../containers/CenterDateSelect'

import {connect} from 'react-redux'
import moment from 'moment'

export class DashboardDailyView extends Component {

    state = {
        date: moment()
    }

    handleDateChange = (date) => this.setState({date})

    getMilkCollectionsForSelectedCenterAndDate = () => {
        const {centers, milkCollections} = this.props
        const {date} = this.state
        return milkCollections.milkCollectionIds.reduce((milkCollectionsArray, milkCollectionId) => {
                    const milkCollection = milkCollections.milkCollectionsById[milkCollectionId]
                    if (
                        (milkCollection.centerId === centers.selectedId) &&
                        (moment(milkCollection.dateCollected).isSame(date, 'day'))
                    ){
                        milkCollectionsArray.push(milkCollection)
                    }
                    return milkCollectionsArray
                }, [])
    }

    render(){
        const {date} = this.state
        const {milkCollections} = this.props
        if(!milkCollections) return null
        const milkCollectionsArray = this.getMilkCollectionsForSelectedCenterAndDate()
    
        return (
            <Fragment>         
                <CenterDateSelect value={date} onSelect={this.handleDateChange}/>
                <DailyStatisticsPanel milkCollectionsArray={milkCollectionsArray}/>
                <MilkCollectionsTable milkCollectionsArray={milkCollectionsArray}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    milkCollections: state.milkCollections
})
export default connect(mapStateToProps)(DashboardDailyView)