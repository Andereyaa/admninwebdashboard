import {firestore} from '../firebase'
import {logError} from '../utils/errorHandling'
import {fetchMilkCollections} from './milkCollections'
import moment from 'moment'

export const SAVE_CENTER = 'SAVE_CENTER'
export const SELECT_CENTER = 'SELECT_CENTER'
export const UNSUBSCRIBE_FROM_CENTER = 'UNSUBSCRIBE_FROM_CENTER'

export const saveCenter = (id, center) => {
    return {
        type: SAVE_CENTER,
        payload: {
            id,
            center
        }
    }
};

export const selectCenter = id => {
    return {
        type: SELECT_CENTER,
        payload: {
            id
        }
    }
}

export const unsubscribeFromCenter = id => {
    return {
        type: UNSUBSCRIBE_FROM_CENTER,
        payload: {
            id
        }
    }
}


export const fetchCenters = () => {
    const institutionRef = firestore.collection("institutions")
                
    return (dispatch, getState) => {
        const {institution} = getState()
        return institutionRef.doc(institution.id).collection("centers").get()
        .then(querySnapshot => {
            const centers = querySnapshot.docs.map(docRef => ({...docRef.data(), id: docRef.id}));
            centers.forEach(center => {
                dispatch(saveCenter(center.id, center))
            })
            return {success: true}
        })
        .catch(error => {
            logError("something went wrong",error)
            return {success: false}
        })
    }
}

export const fetchSubscribeToCenter = (centerId) => {
    /**
     * Purpose: retrieve the a center from the firestore database
     * Note: the onSnapshot below watches for changes to the center on the server
     */
    
    return (dispatch, getState) => {
        const {institution} = getState()
        const centerRef = firestore.collection("institutions").doc(institution.id)
            .collection("centers").doc(centerId)
        const unsubscribeFunction = centerRef
            .onSnapshot( docRef => {
                const center = {id:docRef.id,...docRef.data(), unsubscribeFunction}
                dispatch(saveCenter(center.id, center))
                return true
            },
            error => {
                error.message = `Failed to fetch the center - centerId: ${centerId} institutionId ${institution.id}: ${error.message}`
                logError(error)
                return false
            });

        return unsubscribeFunction
    }
}

export const fetchLoadCenter = (centerId) => {
    return async (dispatch, getState) =>{
        const {centers} = getState()
        const center = centers.centersById[centerId]
        if (!center) return false
        if (!center.unsubscribeFunction){
            dispatch(fetchSubscribeToCenter(centerId))
        }

        const dateLastLoaded = center.historicalDataLastLoaded ? 
                                moment(center.historicalDataLastLoaded)
                                : 
                                null
        if ( 
            (!dateLastLoaded) || //if the data has not been loaded or 
            (!moment().isSame(dateLastLoaded, 'day')) //the data was not loaded today
        ){
            dispatch(fetchMilkCollections(centerId))
        }
    }
}