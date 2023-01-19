const express = require('express');
const path = require('path');

const rootDir = require('../utils/path-helper');

const router = express.Router();



router.get('/', (req, res, next) => {
  res.redirect('/admin/input');
});

// router.get('/home', (req, res, next) => {
//   // res.sendFile(path.join(rootDir, 'views', 'home.html'));
//   res.render("home");
// });

module.exports = router;