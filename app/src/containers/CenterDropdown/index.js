import React, {Component} from 'react'

import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

import styles from './CenterDropdown.module.css'

export class CenterDropdown extends Component {

    handleSelectCenter = id => {
        const {centers, actions} = this.props
        if (centers.selectedId && (centers.selectedId !== id)){
            actions.unsubscribeFromCenter(centers.selectedId)
        }
        actions.selectCenter(id)
        const center = centers.centersById[id]
        if (!center.unsubscribeFunction){
            actions.fetchSubscribeToCenter(id)
        }
        if (!center.historicalDataLoaded){
            actions.fetchMilkCollections(id)
        }
    }

    getOptions = centersArray => {
        return centersArray.map(center => <option key={center.id} value={center.id}>
                                            {capitalizeFirstLetterOfAllWords(center.centerName)}
                                        </option>
                                )
    }

    render(){
        const {centers} = this.props
        const centersArray = centers.centerIds.map(centerId => centers.centersById[centerId])
        return (
            <select
                className={styles.container} 
                value={centers.selectedId}
                onChange={e => this.handleSelectCenter(e.target.value)}
            >
                {
                    this.getOptions(centersArray)
                }
            </select>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(CenterDropdown)