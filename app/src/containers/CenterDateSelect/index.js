import React, {Component} from 'react'

import {connect} from "react-redux"

import DatePicker from '../../components/DatePicker'

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
                        {`Milk received at ${capitalizeFirstLetterOfAllWords(centerName)} on `} 
                        <DatePicker value={value} onSelect={onSelect}/>
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