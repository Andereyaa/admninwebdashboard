import firebase, {firestore} from '../firebase'

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
            console.warn("something went wrong",error)
            return false
        })
}