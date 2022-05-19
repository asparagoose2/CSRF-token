const express = require('express')
const app = express()
const port = 3000
const { randomBytes } = require('crypto');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
})

app.use(cookieSession({
  name: 'session',                              // name of the cookie
  secret: 'MAKE_THIS_SECRET_SECURE',            // key to encode session
  maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
  sameSite: 'lax',                              // controls when cookies are sent
  path: '/',                                    // explicitly set this for security purposes
  httpOnly: true                                // cookie is not available to JavaScript (client)
}));

app.get('/csrftoken', (req, res) => {
  const token = randomBytes(25).toString('base64');
  console.log(token);
  req.session.csrf = token;
    res.json({
      token
    });

});

app.post("/buy",(req,res) => {
  console.log(req.body.token)
  console.log(req.session.csrf);
  if(!req.body.token || !req.session.csrf || req.body.token !== req.session.csrf) {
    res.statusCode = 402;
    res.sendFile(process.cwd() + '/public/error.html');
  } else {
    res.sendFile(process.cwd() + '/public/ok.html');
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});