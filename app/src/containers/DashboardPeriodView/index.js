import React, { Component } from 'react'

import PeriodSelect from '../../containers/PeriodSelect'
import PeriodReportTable from '../../containers/PeriodReportTable'
import PeriodStatisticsPanel from '../../containers/PeriodStatisticsPanel'

import { connect } from 'react-redux'
import { capitalizeFirstLetterOfAllWords } from '../../utils/formatting'

export class DashboardPeriodView extends Component {

    getMilkCollectionsForSelectedCenterAndPeriod = (selectedCenter, selectedPeriod) => {
        const {milkCollections } = this.props

        return milkCollections.milkCollectionIds.reduce((milkCollectionsArray, milkCollectionId) => {
            const milkCollection = milkCollections.milkCollectionsById[milkCollectionId]
            if ((milkCollection.centerId === selectedCenter.id) && 
                milkCollection.dateCollected >= selectedPeriod.startDate  &&
                milkCollection.dateCollected < selectedPeriod.endDate ) {
                milkCollectionsArray.push(milkCollection)
            }
            return milkCollectionsArray
        }, [])
    }

    render() {
        const { periods, centers } = this.props
        const selectedPeriod = periods.selectedId ? periods.periodsById[periods.selectedId] : null
        const selectedCenter = centers.selectedId ? centers.centersById[centers.selectedId] : null
        const milkCollectionsArray = this.getMilkCollectionsForSelectedCenterAndPeriod(selectedCenter, selectedPeriod)

        return (
            <div>
                {
                    selectedCenter ?
                        <div>
                            {`${capitalizeFirstLetterOfAllWords(selectedCenter.centerName)} Milk Records from `} <PeriodSelect />
                        </div>
                        :
                        null
                }
                {
                    selectedCenter && selectedPeriod ?
                        <div>
                            <PeriodStatisticsPanel milkCollectionsArray={milkCollectionsArray} />
                            <PeriodReportTable selectedPeriod={selectedPeriod} />
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    periods: state.periods,
    milkCollections: state.milkCollections,
    centers: state.centers
})
export default connect(mapStateToProps)(DashboardPeriodView)