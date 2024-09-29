const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dgram = require('dgram');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:63342", // Вкажіть правильний порт
        methods: ["GET", "POST"],
        credentials: true
    }
});

const udpClient = dgram.createSocket('udp4');

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('newMessage', (data) => {
        console.log('Message received from web:', data);
        const message = Buffer.from(JSON.stringify(data));
        udpClient.send(message, 41234, 'localhost', (err) => {
            if (err) console.error('UDP message send error:', err);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Socket.IO server is running on port 3000');
});
