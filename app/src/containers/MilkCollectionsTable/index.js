import React, {Component} from 'react'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import styles from './MilkCollectionsTable.module.css'

export class MilkCollectionsTable extends Component{
    render(){
        return (
            <div className={styles.container}>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MilkCollectionsTable)