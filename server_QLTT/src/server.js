import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connection from './configs/connectDB';
import cors from 'cors';
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
var morgan = require('morgan')



const app = express();
// const port = process.env.PORT || 8082;
const port = 8081;
app.use(cors({
    origin: true,
    credentials: true,
  }))
// app.use((req, res, next) => {
//     //check => return res.send()
//     console.log('>>> run into my middleware')
//     console.log(req.method)
//     next();
// })

app.use(morgan('combined'))

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})
// app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:8081', // Replace with your Node.js backend's URL
//       changeOrigin: true,
//     })
//   );

try {
  app.listen(port, () => {
    console.log("Server started");
  });
} catch (error) {
  console.error("Error starting the server:", error);
}

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

