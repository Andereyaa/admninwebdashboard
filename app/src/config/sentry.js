/**
 * Purpose: Sentry remotely tracks runtime errors from our app
 * View Issues Dashboard here: https://sentry.io/organizations/boresha-technologies/issues/
 */
import * as Sentry from '@sentry/browser';
import {version} from "./release"
import {selectedEnvironment} from "../firebase/config"

import {configureStore } from "../store/configureStore"
import moment from "moment"

const store = configureStore()

Sentry.init({
    dsn: "https://b21921d8665543c6add6b276104509da@sentry.io/1502867",
    release: version,
    environment: selectedEnvironment
});

export const configureScope  = () => {
    Sentry.configureScope((scope) => {
        const {users} = store.getState()
        const user = users.authenticatedUserId ? users.usersById[users.authenticatedUserId] : null
        scope.setUser({
            id: user ? user.id : "Not Logged In",
            username: user ? `${user.firstName} ${user.lastName}` : "No name available",
            phoneNumber: user.phoneNumber ? user.phoneNumber : "No Phone Number",
            email : user.phoneNumber ? user.phoneNumber : "No Phone Number"
        });
        scope.setExtra("localTime", moment().format("MMM DD, YY h:mm A Z"));
    });

}