import React, {Component} from "react"

import {connect} from 'react-redux'

export class EnvironmentBadge extends Component {
    render(){
        const {system} = this.props
        return (
            <div>{system.environment}</div>
        )
    }
}

const mapStateToProps = state => ({
    system: state.system
})

export default connect(mapStateToProps)(EnvironmentBadge)