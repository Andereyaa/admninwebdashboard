## A: Setting up the project for the first time
1. clone the repo with `git clone git@bitbucket.org:TonyBoresha18/clientwebdashboard.git`
2. navigate to the app directory with `cd app`
3. install the dependencies with `npm install`
4. run the app with `npm start`

## B: Depolying changes
1. `npm build` - to include your changes in the production build
2. `firebase serve --only hosting` - to see the app as it would be deployed t localhost:5000
3. `firebase deploy --only hosting` to push your changes live to the web

## C: Releasing new versions
1. Follow deployment instructions in Section B above
2. `git tag -a v1.1.1 -m "Short message here"` to tag the version branch (as version 1.1.1 for example)
3. `git push origin v1.1.1` to push the tag to our repo
4. `git push` to push the latest changes of the release branch to the origin for merging and deletion