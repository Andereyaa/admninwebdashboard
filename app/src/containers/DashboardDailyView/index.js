import React, {Component, Fragment} from 'react'

import DailyStatisticsPanel from '../../containers/DailyStatisticsPanel'
import MilkCollectionsTable from '../../containers/MilkCollectionsTable'
import CenterDateSelect from '../../containers/CenterDateSelect'
import SupplierTable from '../../containers/SuppliersTable'

import {connect} from 'react-redux'
import {getMomentLocalToSelectedCountry} from '../../utils/dateHandling'

export class DashboardDailyView extends Component {

    state = {
        date: getMomentLocalToSelectedCountry()
    }

    handleDateChange = (date) => this.setState({date})

    getMilkCollectionsForSelectedCenterAndDate = () => {
        const {centers, milkCollections} = this.props
        const {date} = this.state
        return milkCollections.milkCollectionIds.reduce((milkCollectionsArray, milkCollectionId) => {
                    const milkCollection = milkCollections.milkCollectionsById[milkCollectionId]
                    if (
                        (milkCollection.centerId === centers.selectedId) &&
                        (getMomentLocalToSelectedCountry(milkCollection.dateCollected).isSame(date, 'day'))
                    ){
                        milkCollectionsArray.push(milkCollection)
                    }
                    return milkCollectionsArray
                }, [])
    }

    getAbsentSuppliersForSelectedCenterAndDate = (milkCollectionsForSelectedCenterAndDate) => {
        const {suppliers, centers} = this.props
        const presentSupplierIdsArray = milkCollectionsForSelectedCenterAndDate.map(milkCollection => milkCollection.supplierId)
        const absentSuppliersIdsArray = suppliers.supplierIds.filter(supplierId => !presentSupplierIdsArray.includes(supplierId))
        return absentSuppliersIdsArray.reduce((absentSuppliersArray, supplierId)=>{
            const supplier = suppliers.suppliersById[supplierId]
            if(supplier.createdByCenterId === centers.selectedId){
                absentSuppliersArray.push(supplier)
            }
            return absentSuppliersArray
        },[])
    }

    render(){
        const {date} = this.state
        const {milkCollections, periods} = this.props
        if(!milkCollections) return null
        const milkCollectionsArray = this.getMilkCollectionsForSelectedCenterAndDate()
        const absentSuppliersArray = this.getAbsentSuppliersForSelectedCenterAndDate(milkCollectionsArray)

        return (
            <Fragment>         
                {
                    periods.currentPeriodId ?
                    <CenterDateSelect value={date} onSelect={this.handleDateChange}/>
                    :
                    null
                }
                <DailyStatisticsPanel milkCollectionsArray={milkCollectionsArray}/>
                <MilkCollectionsTable milkCollectionsArray={milkCollectionsArray} tableTitle="Milk Colllections Today"/>
                <SupplierTable suppliersArray={absentSuppliersArray} tableTitle="Absent Suppliers Today" />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    milkCollections: state.milkCollections,
    periods: state.periods,
    suppliers: state.suppliers
})
export default connect(mapStateToProps)(DashboardDailyView)