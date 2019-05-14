import React, {Component} from 'react'
import SideBar from '../SideBar'

export default class ScreenContent extends Component {
    render (){
        return (
            <div>
                <SideBar />
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
} 