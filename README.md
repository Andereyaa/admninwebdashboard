##Setting up the project for the first time
1. clone the repo with `git clone git@bitbucket.org:TonyBoresha18/clientwebdashboard.git`
2. navigate to the app directory with `cd app`
3. install the dependencies with `npm install`
4. run the app with `npm start`

## Depolying changes
1. `npm build` - to include your changes in the production build
2. `firebase serve --only hosting` - to see the app as it would be deployed t localhost:5000
3. `firebase deploy --only hosting` to push your changes live to the web