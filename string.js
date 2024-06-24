const client = require('./redis/client.js');

async function set(key, val){
    await client.set(key, val);
    await client.expire(key, 10); // expire key after 10 second
    console.log('setted');
}

async function get(key){
    const res = await client.get(key);
    console.log(res);
}

set('HP:1', "Laptop");
get("HP:1");