import firebase, {firestore} from '../firebase'
import {logError} from '../utils/errorHandling'

export const SAVE_INSTITUTION = 'SAVE_INSTITUTION'

export const saveInstitution = (institution) => {
    return {
        type: SAVE_INSTITUTION,
        payload: {
            institution
        }
    }
};


export const fetchInstitution = (institutionId) => {
    const institutionRef = firestore.collection("institutions")
                
    return dispatch => institutionRef.doc(institutionId).get()
        .then(docRef => {
            const institution = {id: docRef.id, ...docRef.data()}
            dispatch(saveInstitution(institution))
            return true
        })
        .catch(error => {
            logError("something went wrong",error)
            return false
        })
}