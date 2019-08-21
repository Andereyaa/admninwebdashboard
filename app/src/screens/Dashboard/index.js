import React, {Component} from 'react'

import Switch from '../../components/Switch'
import CenterSelect from '../../containers/CenterSelect'
import CenterDropdown from '../../containers/CenterDropdown'
import DashboardPeriodView from '../../containers/DashboardPeriodView' 
import DashboardDailyView from '../../containers/DashboardDailyView'
import styles from './Dashboard.module.css'
import {trackPageView, trackEvent} from "../../config/googleAnalytics"
import {connect} from "react-redux"

class Dashboard extends Component {

    state = {
        selectedViewOption: "daily"
    }

    componentDidMount(){
        trackPageView("/dashboard");
    }

    viewOptions=[{text: "Daily Milk Records", value:"daily"},{text: "Milk Records By Period", value: "period"}]
    
    handleSelectViewOption = selectedViewOption => {
        const {institution, centers} = this.props
        const center = centers.centersById[centers.selectedId]
        this.setState({selectedViewOption}) 
        trackEvent(
            'Data Consumption',
            'Changed Milk Record View',
            `Selected Milk Record View "${selectedViewOption}" at Institution "${institution.institutionName}" for center ${center.centerName}`
        )
    }

    render (){
        const {selectedViewOption} = this.state
        const {institution} = this.props
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
                    institution && institution.id ?
                    <React.Fragment>
                        {
                            selectedViewOption === 'daily' ?
                        <DashboardDailyView />
                        :
                        selectedViewOption === "period" ?
                        <DashboardPeriodView />
                        :
                        null
                        }
                    </React.Fragment>
                    :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    institution: state.institution,
    centers: state.centers
})

export default connect(mapStateToProps)(Dashboard)