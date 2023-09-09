const express = require('express');
require('dotenv').config();
const app = express();

app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;
  if(!slack_name || !track ){
    res.status(400).json({msg: 'please include slack_name and track in query parameters'});
    return;
  }
  const currentDate = new Date();
  const currentUTCDate = new Date(currentDate.toISOString());

  const formattedDate = currentUTCDate.toISOString().slice(0, 19) + 'Z';

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayOfWeek = daysOfWeek[currentUTCDate.getUTCDay()];

  res.status(200).json({
    slack_name,
    "current_day": currentDayOfWeek,
    "utc_time": formattedDate,
    track,
    "github_file_url": "https://github.com/Akinolaaa/hng-task-1/blob/main/server.js",
    "github_repo_url": "https://github.com/Akinolaaa/hng-task-1.git",
    "status_code": 200,
  })
})

const PORT = 4000 || process.env.PORT

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT} `)
})