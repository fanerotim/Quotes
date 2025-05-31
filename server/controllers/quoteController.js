const mysqlConfig = require('../mySqlConfig');
const router = require('express').Router();
const db = mysqlConfig();

router.get('/', (req, res) => {
    res.status(200).send('Hello from me - the Router!');
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    // this will be exported into a service, but not yet
    const sql = 'SELECT * FROM quotes WHERE id = ?'
    db.query(sql, id, (err, result) => {
        if (err) throw {...err}
        res.status(200).send(result);
    })

})

module.exports = router;