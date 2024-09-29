npm install 
run index.html -> console copy token
server2.js - > const fcmToken = 'token'

cd ./server/ -> node server1.js
cd ./server/ -> node server2.js

run index.html



Firebase console  ->  Project  ->  Project settings  ->  General  ->  Your apps
// Firebase конфігурація
var firebaseConfig = {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
};



Project  ->  Project settings  ->  Cloud Messaging  ->  Web configurat
// Підписка на FCM
messaging.getToken({vapidKey: 'vapid'}).then((currentToken) => {
        if (currentToken) {
            console.log('FCM Token:', currentToken);
        } else {
            console.warn('No registration token available.');
        }
}).catch((err) => {
        console.error('An error occurred while retrieving token.', err);
});
ion 



Project  ->  Project settings  ->  Service accounts  ->  Generate new private key
// Ініціалізація Firebase Admin SDK
const serviceAccount = require('../file');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
