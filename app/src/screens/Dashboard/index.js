import React, {Component} from 'react'

import Switch from '../../components/Switch'
import CenterSelect from '../../containers/CenterSelect'
import CenterDropdown from '../../containers/CenterDropdown'
import DailyStatisticsPanel from '../../containers/DailyStatisticsPanel'
import MilkCollectionsTable from '../../containers/MilkCollectionsTable'
import CenterDateSelect from '../../containers/CenterDateSelect'

import styles from './Dashboard.module.css'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import moment from 'moment'

export class Dashboard extends Component {

    state = {
        date: moment(),
        selectedViewOption: "daily"
    }

    viewOptions=[{text: "Daily View", value:"daily"},{text: "Period View", value: "period"}]
    
    handleSelectViewOption = selectedViewOption => this.setState({selectedViewOption})

    getMilkCollectionsForSpecifiedDate = (milkCollectionsArray) => {
        const {date} = this.state
        return milkCollectionsArray.filter(milkCollection => {
            const dateCollected = moment(milkCollection.dateCollected)
            return date.isSame(dateCollected, 'day')
        })
    }

    handleDateChange = (date) => this.setState({date})

    getMilkCollectionsForSelectedCenter = (milkCollectionsArray) => {
        const {centers} = this.props
        return milkCollectionsArray.filter(milkCollection => {
            return milkCollection.centerId === centers.selectedId
        })
    }

    render (){
        const {date, selectedViewOption} = this.state
        const {milkCollections} = this.props
        if(!milkCollections) return null
        const milkCollectionsArray = milkCollections.milkCollectionIds.map(milkCollectionId => {
            return milkCollections.milkCollectionsById[milkCollectionId]
        })
        const milkCollectionsOnDate = this.getMilkCollectionsForSpecifiedDate(milkCollectionsArray)
        const milkCollectionsForSelectedCenter = this.getMilkCollectionsForSelectedCenter(milkCollectionsOnDate)


        return (
            <div className={styles.container}>
                <div className={styles.centerSelect}>
                    <CenterSelect />
                </div>
                <div className={styles.centerDropdown}>
                    <CenterDropdown/>
                </div>
                <Switch options={this.viewOptions} 
                        selectedValue={selectedViewOption} 
                        onSelect={this.handleSelectViewOption}/>
                {
                    selectedViewOption === 'daily' ?
                <React.Fragment>
                    
                    <CenterDateSelect value={date} onSelect={this.handleDateChange}/>
                    <DailyStatisticsPanel milkCollectionsArray={milkCollectionsForSelectedCenter}/>
                    <MilkCollectionsTable milkCollectionsArray={milkCollectionsForSelectedCenter}/>
                </React.Fragment>
                :
                selectedViewOption === "period" ?
                <div></div>
                :
                null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections,
    centers: state.centers
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)