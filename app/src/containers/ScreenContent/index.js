import React, {Component} from 'react'
import SideBar from '../SideBar'
import TopBar from '../../components/TopBar'

import {INDEX} from '../../constants/screenPathnames'

export default class ScreenContent extends Component {

    
    getTopBarName = () => {
        const {currentScreenPathname} = this.props
        switch (currentScreenPathname){
            case INDEX: return 'Dashboard';
            default: return ""
        }
    } 

    render (){
        const {currentScreenPathname} = this.props
        return (
            <div>
                <TopBar text={this.getTopBarName()}/>
                <SideBar currentScreenPathname={currentScreenPathname} />
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
} 