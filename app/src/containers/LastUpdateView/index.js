import React, { Component } from 'react'
import styles from './LastUpdateView.module.css'
import moment from "moment-timezone"
import { connect } from "react-redux"

class LastUpdateView extends Component {

    state = {
        time: 0
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    resolveAgeOfData = (minutesAgo) => {
        if(minutesAgo < 59){
            return `${minutesAgo} minutes ago`
        }else if (minutesAgo >= 60 && minutesAgo < (60 * 24)){
            return `${Math.round(minutesAgo/60)} hour${Math.round(minutesAgo/60) > 1 ? 's':''}`
        }else if(minutesAgo > (60*24)){
            return `${Math.round(minutesAgo/(60 *24))} day${Math.round(minutesAgo/(60 *24)) > 1 ? 's' : ''}`
    }
}

    render() {
        const { time } = this.state
        const { centers, periods } = this.props
        if (!centers.selectedId || !periods.selectedId)
            return null

        let minutesAgo = moment(time - (periods.periodsById[periods.currentPeriodId]).dateLoadedByCenterId[centers.selectedId]).format('m')
        return (
            <div className={styles.container} style={{visibility: (minutesAgo > 5 ? 'visible' : 'hidden') }}>
                <span>
                    Data Last Updated over {this.resolveAgeOfData(minutesAgo)} ago
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    periods: state.periods
})

export default connect(mapStateToProps)(LastUpdateView)