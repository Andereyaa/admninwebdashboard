import firebase, {firestore} from '../firebase'

export const fetchInstitution = (institutionId) => {
    const institutionRef = firestore.collection("institutions")
                
    return dispatch => institutionRef.doc(institutionId).get()
        .then(docRef => {
            console.log("success", docRef)
            return true
        })
        .catch(error => {
            console.warn("something went wrong",error)
            return false
        })
}