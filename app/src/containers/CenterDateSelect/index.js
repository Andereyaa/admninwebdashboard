import React, {Component} from 'react'

import {connect} from "react-redux"

import DatePicker from '../../components/DatePicker'
import moment from 'moment'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'
export class CenterDateSelect extends Component {
    render(){
        const {centers, value, onSelect} = this.props
        const centerName = centers.selectedId ?
                            centers.centersById[centers.selectedId].centerName
                            :
                            ""
        return (
            <React.Fragment>
                {
                    centers.selectedId ?
                    <div>
                        {`${capitalizeFirstLetterOfAllWords(centerName)} Daily Milk Records for `} 
                        <DatePicker value={value} onSelect={onSelect} max={moment()}/>
                    </div>
                    :
                    null
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers
});


export default connect(mapStateToProps)(CenterDateSelect)