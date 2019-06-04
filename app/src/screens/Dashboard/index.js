import React, {Component} from 'react'
import CenterSelect from '../../containers/CenterSelect'
import DailyStatisticsPanel from '../../containers/DailyStatisticsPanel'
import styles from './Dashboard.module.css'

export class Dashboard extends Component {
    render (){
        return (
            <div className={styles.container}>
                <CenterSelect/>
                <DailyStatisticsPanel />
            </div>
        )
    }
}

export default Dashboard 