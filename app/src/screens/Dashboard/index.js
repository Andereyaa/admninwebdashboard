import React, {Component} from 'react'
import CenterSelect from '../../containers/CenterSelect'
import DailyStatisticsPanel from '../../containers/DailyStatisticsPanel'
import MilkCollectionsTable from '../../containers/MilkCollectionsTable'

import styles from './Dashboard.module.css'

export class Dashboard extends Component {
    render (){
        return (
            <div className={styles.container}>
                <CenterSelect/>
                <DailyStatisticsPanel />
                <MilkCollectionsTable />
            </div>
        )
    }
}

export default Dashboard 