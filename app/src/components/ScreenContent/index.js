import React, {Component} from 'react'

export default class ScreenContent extends Component {
    render (){
        return (
            <div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
} 