import React, {Component} from 'react'
import CenterSelect from '../../containers/CenterSelect'
import DailyStatisticsPanel from '../../containers/DailyStatisticsPanel'

export class Dashboard extends Component {
    render (){
        return (
            <div>
                <CenterSelect/>
                <DailyStatisticsPanel />
            </div>
        )
    }
}

export default Dashboard 