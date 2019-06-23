import firebase, {firestore} from '../firebase'
import {logError} from '../utils/errorHandling'
import {MAX_REQUEST_TIME} from '../constants/connectivity'
import moment from "moment"
import {v4 as uuid4} from 'uuid'

export const SAVE_SUPPLIERS = 'SAVE_SUPPLIERS'


export const fetchAddSupplier = (supplierName, phoneNumber, locationName, supplierType, supplierId = uuid4()) => {

    return async (dispatch, getState) => {
        const {users, centers} = getState()
        const user = users.usersById[users.authenticatedUserId]
        //TODO deal with other usertypes, admin, owner etc whoever is able to login??
        const institutionId = user.owner.institutionIds[0] //TODO will this work for all user types?
        const centerId = centers.selectedId //TODO allow the user to better choose 
                                            //which center the suppliers are assigned to! 
        const currentMoment = moment.utc()
        const supplierPayload = {
            id: supplierId,
            supplierName,
            phoneNumber,
            supplierType,
            locationName,
            createdByUserId: user.id,
            // createdByAppVersion: system.version,
            createdByInstitutionId: institutionId,
            createdByCenterId: centerId,
            createdByUserName: `${user.firstName} ${user.lastName}`,
            createdAt: Date.now(),
            createdAtHumanReadable: currentMoment._d,
            createdByUserType: "owner", //fixfor dynamic user types
            createdOnBackendAt : firebase.firestore.FieldValue.serverTimestamp()
        }
        
        const suppliersRef = firestore.collection("suppliers")
        const requestStart = Date.now()
        let timeoutCancelled = false
        return Promise.race([
            suppliersRef.doc(supplierPayload.id).set(supplierPayload)
                .then(() =>{
                    const responseTime = Date.now() - requestStart
                    timeoutCancelled = true
                    return true
                })
                .catch(error => {
                    const {supplierName, phoneNumber, supplierType, locationName} = supplierPayload
                    error.message = `Failed to add the supplier of name ${supplierName} phone number ${phoneNumber}\
                                    supplier type ${supplierType} location name ${locationName}: ${error.message}`
                    logError(error)
                    return false
                }),
            new Promise((_, reject) => setTimeout(() => {
                    if (!timeoutCancelled){
                        reject(false)
                    }
                }, MAX_REQUEST_TIME)
            )
            ]).then(() => true)
            .catch(() => false)
        }
}