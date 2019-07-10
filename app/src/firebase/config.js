import {DEVELOPMENT, SANDBOX, STAGING, PRODUCTION} from "../constants/environments"

const environments = {
    development: {
        /*
            Purpose: ongoing active/experimental/halfway/shitty development
            Always stable: hell no
            Target users: developers
        */
        apiKey: "AIzaSyAd-xRUEZ-B5MStH4lZF3lSAcCfRuLR5Mc",
        authDomain: "boresha-mrl-v2.firebaseapp.com",
        databaseURL: "https://boresha-mrl-v2.firebaseio.com",
        projectId: "boresha-mrl-v2",
        storageBucket: "boresha-mrl-v2.appspot.com",
        messagingSenderId: "582268292724"
    },
    sandbox: {
        /*
            Purpose: business/strategic uses, eg: demos/sales/presentations
            Always stable: yes
            Target users: non-technical staff, marketing, potential users, potential customers
        */
        apiKey: "AIzaSyA1u5_56WN5ukZBhrOKBNAYIZOO31QZomM",
        authDomain: "bodsfsdghry67658790.firebaseapp.com",
        databaseURL: "https://bodsfsdghry67658790.firebaseio.com",
        projectId: "bodsfsdghry67658790",
        storageBucket: "bodsfsdghry67658790.appspot.com",
        messagingSenderId: "435038236746"
    },
    staging: {
        /*
            Purpose: to test new features with internal users or customers
            Always stable: no
            Target users: testers, early-adopter customers, feedback sources
        */
       apiKey: "AIzaSyCO-3iuHWjdyk_YkSSQEaRENa9Ise62mPA",
       authDomain: "boresha-amatemax-staging.firebaseapp.com",
       databaseURL: "https://boresha-amatemax-staging.firebaseio.com",
       projectId: "boresha-amatemax-staging",
       storageBucket: "boresha-amatemax-staging.appspot.com",
       messagingSenderId: "641417411504"
    },
    production: {
        /*
            Purpose: live operations 24/7
            Always stable: it better be
            Target users: (paying) customers
        */
        apiKey: "AIzaSyAqgnvx8Ox3sQCZfbfhHIdHUlRmQ2IT-fw",
        authDomain: "prdadasdsa-242355.firebaseapp.com",
        databaseURL: "https://prdadasdsa-242355.firebaseio.com",
        projectId: "prdadasdsa-242355",
        storageBucket: "prdadasdsa-242355.appspot.com",
        messagingSenderId: "33767765878"
    }
}

export const selectedEnvironment = SANDBOX
export default environments[selectedEnvironment]