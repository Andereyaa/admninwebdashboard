import React, {Component} from 'react'
import SideBar from '../SideBar'
import TopBar from '../../components/TopBar'

import {INDEX, SUPPLIERS} from '../../constants/screenPathnames'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import styles from "./ScreenContent.module.css";

import {logError} from '../../utils/errorHandling'

export class ScreenContent extends Component {

    componentDidMount = async () => {
        await this.loadContent()
        const {centers, actions} = this.props
        //select a default center if none is selected
        const selectedId = centers.selectedId ? centers.selectedId : 
                            (centers.centerIds.length > 0) ? centers.centerIds[0] : null
        if (selectedId){
            actions.selectCenter(selectedId)
            const selectedCenter = centers.centersById[selectedId]
            if (!selectedCenter.unsubscribeFunction){
                actions.fetchSubscribeToCenter(selectedId)
            }
            //TODO do not load unnecessarily
            actions.fetchMilkCollections(selectedId)
          }
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
            logError(error)
        }
    }
    
    getTopBarName = () => {
        const {currentScreenPathname} = this.props
        switch (currentScreenPathname){
            case INDEX: return 'Dashboard';
            case SUPPLIERS: return 'Suppliers'
            default: return ""
        }
    } 

    render (){
        const {currentScreenPathname} = this.props
        return (
            <div>
                <TopBar text={this.getTopBarName()} currentScreenPathname={currentScreenPathname}/>
                <SideBar currentScreenPathname={currentScreenPathname} />
                <div className={styles.screenContainer}>
                    {this.props.children}
                </div>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    users: state.users,
    centers: state.centers
});
  
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenContent);