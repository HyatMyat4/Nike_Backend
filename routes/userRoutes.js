const express = require('express');

const router = express.Router();

const { addUser , getAllUser , LogIn , DeleteUser } = require('../controller/user')


router.get('/getAllUser', getAllUser);

router.post('/Login', LogIn);

router.post('/addUser', addUser);

router.delete('/deleteUser/:id', DeleteUser);



module.exports = router;

