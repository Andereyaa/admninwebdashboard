import React, {Component} from "react"

import {connect} from 'react-redux'

export class VersionBadge extends Component {
    render(){
        const {system} = this.props
        if (!system) return null
        return (
            <div className="badge">{system.version}</div>
        )
    }
}

const mapStateToProps = state => ({
    system: state.system
})

export default connect(mapStateToProps)(VersionBadge)