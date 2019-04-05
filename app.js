const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  //file path
  let filePath = path.join(__dirname, 'public', req.url === '/' ? '600610723(index).html' : req.url
  );

  let extname = path.extname(filePath);

  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
  }
  // console.log(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {  // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
          })
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  })
});

// set port number to run to PORT or 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});