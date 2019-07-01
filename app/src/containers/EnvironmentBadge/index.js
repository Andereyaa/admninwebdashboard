import React, {Component} from "react"

import styles from './EnvironmentBadge.module.css'

import {connect} from 'react-redux'

export class EnvironmentBadge extends Component {
    render(){
        const {system} = this.props
        return (
            <div className="badge">{system.environment}</div>
        )
    }
}

const mapStateToProps = state => ({
    system: state.system
})

export default connect(mapStateToProps)(EnvironmentBadge)