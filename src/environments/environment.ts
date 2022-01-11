// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'default',
  firebase: {
    config: {
      apiKey: 'AIzaSyBY6CxCyMNG5MydveSS-NB2JtpmHfqMwjI',
      authDomain: 'courseapp-d8843.firebaseapp.com',
      projectId: 'courseapp-d8843',
      storageBucket: 'courseapp-d8843.appspot.com',
      messagingSenderId: '9363682275',
      appId: '1:9363682275:web:40ab9aaf25d326a506a6d6'
    },
    actionCodeSettings: {
      url: 'https://localhost:5200/demo',
      handleCodeInApp: true
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
