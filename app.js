import express, { json } from "express"; // const express = require('express');
import bodyParser from "body-parser"; // const bodyParser = require('body-parser');
import mysql from "mysql"; // const mysql = require('mysql');
import dotenv from 'dotenv'; // const dotenv = require('dotenv')
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config()
app.use(bodyParser.json());
app.use(
    cors({
      origin: "*",
    })
);
app.use(json());


// app.get('/', (req, res) => {
//     console.log(`Server listening on port ${PORT}`);
//     res.send('Server is running...')
// });
app.get("/", (req, res) => res.send("Server is running..."));

// app.listen(process.env.PORT || 8081);
// module.exports = app;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


/*
const port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    html = fs.readFileSync('index.html');

const log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

const server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url = '/scheduled') {
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        res.writeHead(200);
        res.write(html);
        res.end();
    }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');


 */
