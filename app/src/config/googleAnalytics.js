import ReactGA from 'react-ga';

export const initializeReactGA = user => {
    
    ReactGA.initialize('UA-146141134-1', {
        debug: (process.env.NODE_ENV !== 'production'),
        titleCase: false,
        gaOptions: {
            userId: user ? user.id : "Not Logged In",
        }
    });
}