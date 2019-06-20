import {firestore} from '../firebase'
import {logError} from '../utils/errorHandling'

export const SAVE_CENTER = 'SAVE_CENTER'
export const SELECT_CENTER = 'SELECT_CENTER'

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