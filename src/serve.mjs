import express from 'express';
import process from 'process';
import ejs from 'ejs';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import proxy from 'express-http-proxy';
// import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
const app = express()
const port = 9000

app.use(timeout('60s'))

app.use('/api', createProxyMiddleware({ 
  target: 'http://fc-internal-tongyi-func.fc-internal-tongyi-service2.1740298130743624.cn-hangzhou.fc.devsapp.net', 
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    proxyReq.setHeader('x-ty-ak', req.get('x-fc-access-key-id') ?? '');
    proxyReq.setHeader('x-ty-sk', req.get('x-fc-access-key-secret') ?? '');
    proxyReq.setHeader('x-ty-st', req.get('x-fc-security-token') ?? '');
    proxyReq.setHeader('x-ty-region', req.get('x-fc-region') ?? '');
  }
}));


// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

app.set('views', process.cwd() + '/dist')
app.engine('html', ejs.renderFile)
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index.html', { 
      UID: req.get('x-fc-account-id'), 
      // TOKEN: btoa(req.get('x-fc-access-key-id') + '|' + req.get('x-fc-access-key-secret')),
      // AK: req.get('x-fc-access-key-id'),
      // SK: req.get('x-fc-access-key-secret'),
      // STS: req.get('x-fc-security-token'),
      // HEADERS: JSON.stringify(req.headers),
    })
})

app.use(express.static('dist'))

app.listen(port, () => {
  console.log(`web app listening on port ${port}`)
})