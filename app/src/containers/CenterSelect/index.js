import React, {Component} from 'react'
import CenterTile from '../../components/CenterTile'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import styles from './CenterSelect.module.css'

export class CenterSelect extends Component {
    render () {
        const {centers} = this.props
        const center = centers.centersById[centers.centerIds[0]]
        return (
            <div className={styles.container}>
                <CenterTile 
                    id={center.id} 
                    centerName={center.centerName}
                />
                
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