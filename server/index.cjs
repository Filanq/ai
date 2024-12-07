// Y2Q3YmM0ZWMtMmQzYi00ZDgyLWJjYmEtMmVhMzAyYTZiYjUxOjJjNDlhM2I3LTQ4MmMtNDJlZC05MzY0LTg3MTBiNGUyOTY2OQ==
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const fs = require('fs');
const fetch = require('node-fetch');
const https = require('https');

// App Init
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

// Routes Init
app.post("/api/gpt", function(req, res){
    let token = req.body.key.trim();
    let history = req.body.history;

    if(!token){
        fetch("https://ngw.devices.sberbank.ru:9443/api/v2/oauth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'RqUID': 'cd7bc4ec-2d3b-4d82-bcba-2ea302a6bb51',
                'Authorization': 'Basic Y2Q3YmM0ZWMtMmQzYi00ZDgyLWJjYmEtMmVhMzAyYTZiYjUxOjJjNDlhM2I3LTQ4MmMtNDJlZC05MzY0LTg3MTBiNGUyOTY2OQ=='
            },
            body: "scope=GIGACHAT_API_PERS",
            agent: httpsAgent,
        }).then(fetch_result_not_json => {
            fetch_result_not_json.json().then(fetch_result => {
                token = fetch_result.access_token;

                fetch("https://gigachat.devices.sberbank.ru/api/v1/chat/completions", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Request-ID': '79e41a5f-f180-4c7a-b2d9-393086ae20a1',
                        'X-Session-ID': 'b6874da0-bf06-410b-a150-fd5f9164a0b2',
                        'X-Client-ID': 'cd7bc4ec-2d3b-4d82-bcba-2ea302a6bb51',
                        'RqUID': 'cd7bc4ec-2d3b-4d82-bcba-2ea302a6bb51',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "model": "GigaChat",
                        "stream": false,
                        "update_interval": 0,
                        "messages": history
                    }),
                    agent: httpsAgent,
                }).then(fetch_result_not_json2 => {
                    fetch_result_not_json2.json().then(fetch_result2 => {
                        let answer = fetch_result2.choices[0].message.content;
                        res.json({message: answer, success: true, key: token});
                    })
                });
            })
        });
    }
    else{
        fetch("https://gigachat.devices.sberbank.ru/api/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Request-ID': '79e41a5f-f180-4c7a-b2d9-393086ae20a1',
                'X-Session-ID': 'b6874da0-bf06-410b-a150-fd5f9164a0b2',
                'X-Client-ID': 'cd7bc4ec-2d3b-4d82-bcba-2ea302a6bb51',
                'RqUID': 'cd7bc4ec-2d3b-4d82-bcba-2ea302a6bb51',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "model": "GigaChat",
                "stream": false,
                "update_interval": 0,
                "messages": history
            }),
            agent: httpsAgent,
        }).then(fetch_result_not_json2 => {
            fetch_result_not_json2.json().then(fetch_result2 => {
                let answer = fetch_result2.choices[0].message.content;
                res.json({message: answer, success: true, key: token});
            })
        });
    }
});

app.get('/*', (req, res) => {
    fs.exists(__dirname + '/..' + req.url, (e) => {
        if(e){
            res.sendFile(req.url, {root: __dirname + '/..'});
        }
        else{
            res.send('404');
        }
    });
});

// Listen App
app.listen(8000);
