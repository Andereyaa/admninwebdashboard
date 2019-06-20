import React, {Component} from 'react'
import CenterTile from '../../components/CenterTile'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import styles from './CenterSelect.module.css'

export class CenterSelect extends Component {
    
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
    }

    getCenterTileForEachCenter = () => {
        const {centers} = this.props
        if (!centers) return null
        return centers.centerIds.map(centerId => {
            const center = centers.centersById[centerId]    

            return <CenterTile 
                        key={center.id}
                        id={center.id} 
                        centerName={center.centerName}
                        selected={center.id === centers.selectedId}
                        onClick={this.handleSelectCenter}
                    />
        })
        
    }
    render () {
        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}> 
                    {this.getCenterTileForEachCenter()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CenterSelect)