import React, {Component} from "react"

import {PRODUCTION} from '../../constants/environments'

import {connect} from 'react-redux'

export class EnvironmentBadge extends Component {
    render(){
        const {system} = this.props
        if (!system || (system.environment === PRODUCTION)) return null
        return (
            <div className="badge">{system.environment}</div>
        )
    }
}

const mapStateToProps = state => ({
    system: state.system
})

export default connect(mapStateToProps)(EnvironmentBadge)