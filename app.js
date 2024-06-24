const express = require('express');
const axios = require('axios').default;
const app = express();
const client = require('./redis/client.js');


app.get('/', async (req, res) => {

    const cachedVal = await client.get('data');
    if(cachedVal){
        return res.json(JSON.parse(cachedVal));
    }else{
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos');
        await client.set('data', JSON.stringify(data));
        return res.json(data);
    }
})

app.listen(8000, (err) => {
    if(!err) console.log('listening on port 8000');
})