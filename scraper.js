    const http = require('http');
    const fs = require('fs');

    const hostname = '127.0.0.1';
    const port = 3000;
    
    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World\n');
    });
    
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });

    // Read directory
    fs.readdir('data', (err, files) => {
      // If directory reading is not possible, then erro is thrown
      if(err) {
        // I take advantage from that to create the folder and do nothing if folder doesn't exist
        fs.mkdir('data', () => {
          console.log("data folder created");
        });        
      }
    });