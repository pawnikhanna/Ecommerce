var express = require('express');

const db = require('../src/lib/database/mysql/connect');
const cache = require('../src/lib/cache/redis');


const cache_prod = async (req, res) => {
    let [err, result] = await to(cache.getresult("Products"));
    if(err)
        res.json({"Data":null, "Error": err});

    if(result!==null)
    {
        return res.json({ result });
    }
}

const cache_prod_byId = async (req, res) => {
    let [err, result] = await to(cache.getresult("Products_byId"));
    if(err)
        res.json({"Data":null, "Error": err});

    if( result !== null)
    {
        return res.json({ result });
    }
}

const cache_catg = async (req, res) => {
    let [err, result] = await to(cache.getresult("Categories"));
    if(err)
        res.json({"Data":null, "Error": err});

    if( result !== null)
    {
        return res.json({ result });
    }
}

const cache_catg_byId = async (req, res) => {
    let [err, result] = await to(cache.getresult("Categories_byId"));
    if(err)
        res.json({"Data":null, "Error": err});

    if( result !== null)
    {
        return res.json({ result });
    }
}

module.exports = {
    cache_prod, cache_catg, cache_prod_byId, cache_catg_byId
}