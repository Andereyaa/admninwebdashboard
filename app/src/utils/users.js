import {userTypesAllowedToLoginToApp} from "../constants/userTypes"

export const verifyUserHasTypeThatIsAllowedToLoginToDashboard = (userTypes = []) => {
    return userTypes.some(userType => {
        return userTypesAllowedToLoginToApp.includes(userType)
    })
}

