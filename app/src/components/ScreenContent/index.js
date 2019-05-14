import React, {Component} from 'react'
import SideBar from '../SideBar'
import TopBar from '../TopBar'

export default class ScreenContent extends Component {
    render (){
        return (
            <div>
                <TopBar />
                <SideBar />
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
} 