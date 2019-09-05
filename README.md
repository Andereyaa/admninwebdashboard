## A: Setting up the project for the first time
1. clone the repo with `git clone git@bitbucket.org:TonyBoresha18/clientwebdashboard.git`
2. navigate to the app directory with `cd app`
3. install the dependencies with `npm install`
4. run the app with `npm start`
5. set up your firebase environment locally following the instructions in Section D

## B: Deploying changes
1. carefully test the software to make sure there are no bugs or typos
2. bump the version number in `app\src\config\release.js`
3. cd `app`
4. run `firebase use <environment>` to change the deployment environment, and test the app online.
    (Optional) run `firebase use` to see your options:

    1. run `firebase use default` to deploy to https://boresha-mrl-v2.web.app/
    2. run `firebase use dashboard-temp` to deploy to https://boresha-dashboard.web.app/
    3. run `firebase use production` to deploy to https://dashboard.boresha.tech/

5. ensure `selectedEnvironment` in `app\src\firebase\config.js` is set properly for each live environment
    1. `DEVELOPMENT` for default (https://boresha-mrl-v2.web.app/)
    2. `PRODUCTION` for production (https://dashboard.boresha.tech) and dashboard-temp (https://boresha-dashboard.web.app/)

6. once the proper environment is set, run `npm run-script build` - to generate a new production build
7. `firebase serve --only hosting` - to see the app as it will be deployed on http://localhost:5000
8. `firebase deploy --only hosting` to deploy your changes live to the web for customers
9. follow the steps in Section C below to tag a new version


## C: Releasing new versions
1. Follow deployment instructions in Section B above
2. `git tag -a v1.1.1 -m "Short message here"` to tag the version branch (as version 1.1.1 for example)
3. `git push origin v1.1.1` to push the tag to our repo
4. `git push` to push the latest changes of the release branch to the origin for merging and deletion

## D: Setting up Firebase Locally
1. install/upgrade firebase, if you don't have the right version already, with `npm install -g firebase-tools@7.1.0` 
2. run `firebase init` to initialize the firebase directory locally
3. type `y` you are ready to proceed
4. Use your space bar to navigate to `Hosting` and press Enter
5. type `build` as your deployment directory
