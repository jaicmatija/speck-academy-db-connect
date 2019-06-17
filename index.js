const express = require('express');
const bodyParser = require('body-parser');
const {
  hallsHandler,
  usersHandler,
  reservationsHandler
} = require('./route-handlers');

const router = new express.Router();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// TODO: Base routes
router.use('/halls', hallsHandler);
router.use('/users', usersHandler);
router.use('/reservations', reservationsHandler);
// Test route
router.get('/', (req, res) => {
  res.send('ok');
});

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));