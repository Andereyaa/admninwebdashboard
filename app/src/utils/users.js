import {OWNER, ACCOUTANT, MANAGER, userTypesAllowedToLoginToApp} from "../constants/userTypes"

export const verifyUserHasTypeThatIsAllowedToLoginToDashboard = (userTypes = []) => {
    return userTypes.some(userType => {
        return userTypesAllowedToLoginToApp.includes(userType)
    })
}

export const getActiveUserType = (userTypes = []) => {
    if (userTypes.includes(OWNER)) return OWNER
    else if (userTypes.includes(MANAGER)) return MANAGER
    else if (userTypes.includes(ACCOUTANT)) return ACCOUTANT
}

