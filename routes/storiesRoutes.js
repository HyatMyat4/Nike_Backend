const express = require('express');

const router = express.Router();
const { getallStories , addStories , deleteStories , getSingleStories, updateStories } = require('../controller/stories')

router.get('/getallStories', getallStories);

router.get('/getSingleStories/:id', getSingleStories);

router.post('/addStories', addStories);

router.patch('/updateStories', updateStories);

router.delete('/deleteStories/:id', deleteStories);

module.exports = router;