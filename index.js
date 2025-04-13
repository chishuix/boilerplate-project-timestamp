// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// 2. 向 /api/:date? 发起带有有效日期的请求应该返回一个 JSON 对象，该对象有一个 unix 键，其值为输入日期的 Unix 时间戳（毫秒类型）
// 3. 向 /api/:date? 发起带有有效日期的请求应该返回一个 JSON 对象，该对象有一个 utc 键，其值为按照 Thu, 01 Jan 1970 00:00:00 GMT 格式化的输入日期的字符串
// 4. 向 /api/1451001600000 发起请求应该返回 { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// 5. 你的项目能够处理 new Date(date_string) 成功解析的日期
// 6. 如果输入的日期字符串无效，API 将返回一个结构为 { error : "Invalid Date" } 的对象

// /api/2015-12-25 输出：{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
// /api/1451001600000 输出：{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
app.get("/api/:date", (req, res) => {
  let input = req.params.date;
  
  // 判断是否是纯数字
  if (/^\d+$/.test(input)) {
    input = +input;
  }

  date = new Date(input);

  // 判断日期是否合法
  if (isNaN(date.getTime())) {
    res.json({ error : "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// 7. 如果日期参数为空，应返回一个包含当前时间的 JSON 对象，其键名为 unix
// 8. 如果日期参数为空，应返回一个包含当前时间的 JSON 对象，其键名为 utc
app.get("/api", (req, res) => {
  let date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});