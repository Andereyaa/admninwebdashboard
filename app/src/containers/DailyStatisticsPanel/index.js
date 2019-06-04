import React, {Component} from 'react'

import Statistic from '../../components/Statistic'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import styles from './DailyStatisticsPanel.module.css'

export class DailyStatisticsPanel extends Component {
    render () {
        return (
            <div className={styles.container}>
                <Statistic 
                    label="volume collected today"
                    value={1846}
                    units="L"
                    unitsPositionedRight={true}
                />
                <Statistic 
                    label="most common rate today"
                    value={900}
                    units="UGX"
                />
                <Statistic 
                    label="no. milk collections today"
                    value={73}
                />
                <Statistic 
                    label="total milk value today"
                    value={1652170}
                    units="UGX"
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyStatisticsPanel)