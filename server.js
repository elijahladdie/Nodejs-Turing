const http = require("http");
const fs = require("fs");
const _ = require('lodash');
const server = http.createServer((req, res) => {
  const num =_.random(0,20);
  console.log(num);
  const greet = _.once(() =>{

  console.log('Hello');
  });
  greet();
  let path = './views/';
switch (req.url){
    case '/':
    path += 'index.html';
    res.statusCode = 200;
    break;
    case '/about':
    path += 'about.html';
    res.statusCode = 200;
    break;

    case '/about-me':
    res.statusCode = 301;
    res.setHeader('Location','/about');
    res.end();
     break;
    default :
    path += '404.html';
    res.statusCode = 404;
    break;
}

  // Sending plan Text
  /* res.setHeader('Content-Type','text/plain');
  * res.write('Hi!!!!, Developer');
  */

  // Sending html file
  res.setHeader("Content-Type", "text/html");
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
//------Do The Same
    // res.write(data);
    res.end(data);
  });
});
server.listen(3000, "localhost", () => {
  console.log("The Server Is Listening At port:3000");
});
