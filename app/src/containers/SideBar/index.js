import React, {PureComponent} from 'react'
import styles from './SideBar.module.css'
import MenuItem from '../../components/MenuItem'
import {INDEX, SUPPLIERS} from '../../constants/screenPathnames'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

export class SideBar extends PureComponent {
    render(){
        const {actions, location, currentScreenPathname} = this.props
        if (!actions) return null
        return (
            <div className={styles.container}>
                <MenuItem text="donut-small" pathname={INDEX} selected={currentScreenPathname==INDEX}/>
                <MenuItem text="suppliers" icon="group" pathname={SUPPLIERS} selected={currentScreenPathname==SUPPLIERS}/>
                <MenuItem text="logout" icon="arrow-back" onClick={actions.logout}/>
            </div>
        )   
    }
}


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})
export default connect(null, mapDispatchToProps)(SideBar)