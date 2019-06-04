import React, {Component} from 'react'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

export class StatisticsPanel extends Component {
    render () {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPanel)