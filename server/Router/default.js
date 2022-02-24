const express = require('express');
const router = express.Router();


router.get('/test', (req,res)=> {
    res.json({meg: "Hello World!"});
})

module.exports = router;