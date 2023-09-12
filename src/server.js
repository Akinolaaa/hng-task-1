const http = require('http');
require('dotenv').config()
const app = require('./app');
const connectDB = require('./db/connect');

const server = http.createServer(app);
const PORT = 4000 || process.env.PORT

const startServer = async() => {
  await connectDB(process.env.DB_URI)
  server.listen(PORT, ()=> {
    console.log(`listening on port ${PORT} `)
  })
}

startServer();

module.exports = server;


// app.get('/api', (req, res) => {
//   const { slack_name, track } = req.query;
//   if(!slack_name || !track ){
//     res.status(400).json({msg: 'please include slack_name and track in query parameters'});
//     return;
//   }
//   const currentDate = new Date();
//   const currentUTCDate = new Date(currentDate.toISOString());

//   const formattedDate = currentUTCDate.toISOString().slice(0, 19) + 'Z';

//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const currentDayOfWeek = daysOfWeek[currentUTCDate.getUTCDay()];

//   res.status(200).json({
//     slack_name,
//     "current_day": currentDayOfWeek,
//     "utc_time": formattedDate,
//     track,
//     "github_file_url": "https://github.com/Akinolaaa/hng-task-1/blob/main/src/server.js",
//     "github_repo_url": "https://github.com/Akinolaaa/hng-task-1.git",
//     "status_code": 200,
//   })
// })