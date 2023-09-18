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

const conn = mysql.createConnection({
    host:process.env.RDS_DB_HOST,
    user:process.env.RDS_DB_USER,
    password:process.env.RDS_DB_PASS, 
    database:process.env.RDS_DB_NAME
});



app.get("/", (req, res) => res.send("Server is running..."));

app.get('/api/items', (req, res) => {
    // throw new Error('database failed to connect');
    conn.connect((err) => { // if(err) throw err;
        console.log('Database is connected to app');    
    })

    try {
        let sql = "SELECT * FROM items";
    
        let query = conn.query(sql, (err, results) => {
            // if(err) throw err;
            res.send(apiResponse(results))
        });

        // let results = '[{"id":0,"title":"first title","body":"this is body"},{"id":2,"title":"second title","body":"this is body"}]'
        // res.send(apiResponse(results))
        
        conn.end();

    } catch(e) {
        console.log(e);
        conn.end();
        // res.send(apiResponse([{'msg':'database failed to connect!'}]))
        res.send(apiResponse(e))
    }

    

    // conn.connect(function(err) {
    //     if (err) throw err;
    //     conn.query("SELECT * FROM customers", function (err, result, fields) {
    //       if (err) throw err;
    //       console.log(result);
    //       res.send(apiResponse(result))
    //     });
    //     conn.end();
    // });

    // conn.query(sql, (err, results) => {
    //     // if(err) throw err;
    //     // res.send(apiResponse(results))
    //     if(err) {
    //         res.send(apiResponse(err))
    //     }else{
    //         res.send(apiResponse(results))
    //     }
        
    // });

    // let results = '{"status":200,"error":null,"response":[{"id":1,"title":"first title","body":"this is body"},{"id":2,"title":"second title","body":"this is body"}]}'
    // res.send(apiResponse(results))
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

function apiResponse(results) {
    return JSON.stringify({"status":200, "error":null, "response":results});
}


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
