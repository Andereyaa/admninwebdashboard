import ReactGA from 'react-ga';
import {PRODUCTION, DEVELOPMENT} from '../constants/environments'
import {selectedEnvironment} from '../firebase/config'

export const initializeReactGA = user => {
    
    ReactGA.initialize('UA-146141134-1', {
        debug: (process.env.NODE_ENV !== 'production'),
        titleCase: false,
        gaOptions: {
            userId: user ? user.id : "Not Logged In",
        }
    });
}

export const trackPageView = url => {
    if (!url) return
    if (selectedEnvironment === PRODUCTION) {
        ReactGA.pageview(url);
    } else console.log(`Untracked page view of ${url} in ${selectedEnvironment}`)
}

export const trackEvent = (category, action, label) => {
    if (!(category && action && label)) return
    if (selectedEnvironment === PRODUCTION) {
        ReactGA.event({
            category,
            action,
            label
        });
    } else console.log(`Untracked event category: ${category}, action: ${action}, label: ${label}, in ${selectedEnvironment}`)
}

export const setUser = userId => {
    if (!userId ) return 
    ReactGA.set({userId})
}