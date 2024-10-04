const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const net = require('net'); // To accept TCP connections from Unity

// Set up the Express app for serving static files or for testing purposes
const app = express();
const server = http.createServer(app);

// Create WebSocket server to broadcast to clients (MERN app React dashboard)
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    ws.on('close', () => console.log('Client disconnected'));
});

// Create a TCP server to receive Unity frame data
const unityServer = net.createServer((socket) => {
    console.log('Unity connected');

    // When Unity sends data (image frames), broadcast to all WebSocket clients
    socket.on('data', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    socket.on('end', () => {
        console.log('Unity disconnected');
    });
});

// Start the TCP server to listen for Unity data
unityServer.listen(8080, () => {
    console.log('Listening for Unity connections on port 8080');
});

// Start the HTTP server for WebSocket and potential static file serving
server.listen(3000, () => {
    console.log('WebSocket server running on http://localhost:3000');
});
