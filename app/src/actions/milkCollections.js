import {firestore} from '../firebase'
import {logError} from '../utils/errorHandling'

import {MONTH_IN_MILLISECONDS} from '../constants/time'

export const SAVE_MILK_COLLECTIONS = 'SAVE_MILK_COLLECTIONS'

export const saveMilkCollections = (milkCollections, centerId) => {
    return {
        type: SAVE_MILK_COLLECTIONS,
        payload: {
            milkCollections,
            centerId
        }
    }
}

export const fetchMilkCollections = (centerId) => {
    /**
     * Purpose: retrieve the milk collections for this center from the firestore database
     */

    const milkCollectionsRef = firestore.collection("milkCollections")

    // TODO make time settings configurable
    const oneMonthAgo = Date.now() - MONTH_IN_MILLISECONDS

    return dispatch => milkCollectionsRef
        .where("centerId", "==", centerId)
        .where("dateCollected", ">", oneMonthAgo)
        .get()
        .then(querySnapshot => {
            //get an array of milkCollections from the snapshot
            const milkCollections = querySnapshot.docs.map(docRef => ({...docRef.data(), id: docRef.id}));
            dispatch(saveMilkCollections(milkCollections, centerId))
            return true
        })
        .catch(error => {
            error.message = `Failed to fetch the milk collections for centerId: ${centerId} with dateCollecteds after ${oneMonthAgo}: ${error.message}`
            logError(error)
            return false
        });
}