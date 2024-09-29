const dgram = require('dgram');
const admin = require('firebase-admin');

// Ініціалізація Firebase Admin SDK
const serviceAccount = require('../file.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const udpServer = dgram.createSocket('udp4');

udpServer.on('message', (msg, rinfo) => {
    console.log(`Message received from UDP client: ${msg}`);
    const { title, message } = JSON.parse(msg);

    const fcmToken = 'token';

    const fcmMessage = {
        notification: {
            title: title,
            body: message
        },
        token: fcmToken
    };

    admin.messaging().send(fcmMessage)
        .then((response) => {
            console.log('Successfully sent FCM message:', response);
        })
        .catch((error) => {
            console.error('Error sending FCM message:', error);
        });
});

udpServer.bind(41234, () => {
    console.log('UDP Server is listening on port 41234');
});
