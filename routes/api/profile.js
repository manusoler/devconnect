const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => res.json({ var1 : 'value1' }));

module.exports = router;