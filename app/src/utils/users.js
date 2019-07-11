import {OWNER, ACCOUTANT, MANAGER, userTypesAllowedToLoginToApp, ACCOUNTANT} from "../constants/userTypes"

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

export const getInstitutionIdFromUser = user => {
    const activeUserType = getActiveUserType(user.userTypes)
    if (!activeUserType) throw new Error('User has none of the allowed user types, they should not be logged in')
    if (activeUserType === OWNER) {
        //TODO in future deal with possibility of multiple institutions
        return user.owner.institutionIds[0]
    } else if (
                (activeUserType === ACCOUNTANT) ||
                (activeUserType === MANAGER)
            )
    {
        return user[activeUserType].institutionId
    }
} 

