import React, {Component, Fragment} from 'react'
import styles from './HamburgerMenu.module.css' 
import Icon from '../../components/Icon'
import MenuItem from '../../components/MenuItem'
import {INDEX, SUPPLIERS} from '../../constants/screenPathnames'

import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import * as actions from "../../actions"

export class HamburgerMenu extends Component {

    state = {
        menuOpen: false
    }

    toggleMenu = () => this.setState({menuOpen: !this.state.menuOpen})

    render (){
        const {menuOpen} = this.state
        const {currentScreenPathname, actions} = this.props
        const menuStyle = menuOpen ? styles.open : null
        return (
            <div className={styles.container}>
                <span className={styles.menuButton} onClick={this.toggleMenu}>
                    <Icon icon="menu"/>
                </span>
                <div className={[styles.dropdown, menuStyle].join(" ")}>
                    <MenuItem text="dashboard" pathname={INDEX} selected={currentScreenPathname ===INDEX} afterClick={this.toggleMenu}/>
                    <MenuItem text="suppliers" icon="group" pathname={SUPPLIERS} selected={currentScreenPathname===SUPPLIERS} afterClick={this.toggleMenu}/>
                    <MenuItem text="logout" icon="arrow-back" onClick={actions.logout}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(null, mapDispatchToProps)(HamburgerMenu)