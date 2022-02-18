#Testing locally
Official guide here : https://firebase.google.com/docs/functions/local-emulator

##Prerequisite
- [Node & npm installed](https://nodejs.org/en/)
- Firebase tools installed: `npm install -g firebase-tools`

##Setup
- Login with your google firebase account tied to the projet: `firebase login`
- Retrieve the functions configs : `firebase functions:config:get > .runtimeconfig.json`
- Configure emulators: `firebase init emulators` & pick firestore and functions
- Run the emulators: `npm run serve` (only for functions)
