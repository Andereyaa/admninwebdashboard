import firebase, {firestore} from '../firebase'

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SAVE_USER = 'SAVE_USER';

export const login = (id) => {
    return {
        type: LOGIN,
        payload: {
            id
        }
    }
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: {}
    }
};

export const saveUser = (id, user) => {
    return {
        type: SAVE_USER,
        payload: {
            id,
            user,
        }
    }
};

export const fetchLogin = (email, password) => {
    /**
     * Purpose: log the user in and save his userId
     */
    return dispatch => firebase.auth().signInWithEmailAndPassword(email, password)
        .then(auth => {
            dispatch(login(auth.user.uid));
            return {success: true, userId: auth.user.uid}
        })
        .catch(error => {
            console.warn(error);
            return {success: false, code: error.code}
        });
};

export const fetchUser = (userId) => {
    console.log(`fetching user ${userId}`)
}