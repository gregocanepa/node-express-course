const express = require('express');
const router = express.Router();

router.post('/login', (req,res)=>{
    console.log(req.body)
    const name = req.body['name']
    if (name) {
        return res.status(200).send(`Welcome ${name}!!!`)
    }
})

module.exports = router