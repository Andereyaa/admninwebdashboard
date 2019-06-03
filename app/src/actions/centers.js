import {firestore} from '../firebase'
import {logError} from '../utils/errorHandling'

export const SAVE_CENTER = 'SAVE_CENTER'

export const saveCenter = (id, center) => {
    console.log("in save center, saving", center)
    return {
        type: SAVE_CENTER,
        payload: {
            id,
            center
        }
    }
};


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