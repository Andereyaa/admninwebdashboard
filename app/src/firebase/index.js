/**
 * Purpose: initialize and make available both firestore and firebase
 */
import config from './config'
import firebase from 'firebase'

require("firebase/firestore");

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase