import React from 'react'
import styles from './Icon.module.css'

import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import Lock from '@material-ui/icons/Lock'

/**
 * Documentation here: https://www.npmjs.com/package/@material-ui/icons
 * 
 * Note: This component uses a switch statement to determine which icon to display
 * 
 * Important:
 *     :  If the icon you want is not imported above^, import it using the 
 *     :  currently used import style `import IconName from '@material-ui/icons/Dashboard'`
 *     :  in the style `import {IconName} from '@material-ui/icons'` will load all available icons
 *     :  into the software and bloat the program 
 * 
 */

export default ({icon="dashboard", customStyles={}}) => {
    icon = icon.toLowerCase()
    let SelectedIcon = Dashboard
    switch (icon) {
        case 'dashboard' : SelectedIcon = Dashboard; break;
        case 'lock' : SelectedIcon = Lock; break;
        case 'person' : SelectedIcon = Person; break;
        default: SelectedIcon = Dashboard
    }
    return (
        <SelectedIcon style={customStyles} className={styles.container}/>
    )
}