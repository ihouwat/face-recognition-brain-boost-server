const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('this is ')
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
});



/* ROUTES to build

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user (updated with ranking)

*/