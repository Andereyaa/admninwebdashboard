import React, {Component} from 'react'
import SideBar from '../SideBar'
import TopBar from '../../components/TopBar'

import {INDEX} from '../../constants/screenPathnames'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

export class ScreenContent extends Component {

    componentDidMount = () => {
        this.loadContent()
    }

    loadContent = async () => {
        const {actions, users} = this.props
        const authenticatedUser = users.usersById[users.authenticatedUserId]
        const institutionId = authenticatedUser.owner.institutionIds[0]
        try {
            let response = await actions.fetchInstitution(institutionId)
            if (!response.success) throw new Error(`Something went wrong`)
            response = await actions.fetchCenters()
        } catch (error){

        }
    }
    
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

const mapStateToProps = state => ({
    users: state.users
});
  
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenContent);