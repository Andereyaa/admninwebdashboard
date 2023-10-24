import {firestore} from '../firebase'
import {logError} from '../utils/errorHandling'

export const SAVE_INSTITUTION = 'SAVE_INSTITUTION'

export const saveInstitution = (id, institution) => {
    return {
        type: SAVE_INSTITUTION,
        payload: {
            id,
            institution
        }
    }
};


export const fetchInstitution = (institutionId) => {
    const institutionRef = firestore.collection("institutions")
                
    return dispatch => institutionRef.doc(institutionId).get()
        .then(docRef => {
            const institution = docRef.data()
            dispatch(saveInstitution(docRef.id, institution))
            return {success: true}
        })
        .catch(error => {
            logError("something went wrong",error)
            return {success: false}
        })
}