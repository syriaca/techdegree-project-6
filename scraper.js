const http = require('http');
const fs = require('fs');
const scrapeIt = require('scrape-it');
const dateFormat = require('dateformat');
let now = new Date()

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
  // If directory reading is not possible, then error is thrown so... I take advantage from that to create the folder and do nothing if folder doesn't exist //
  if(err) {
    fs.mkdir('data', () => {
      console.log('data folder created');
    });        
  }
});

// Callback interface
scrapeIt('http://shirts4mike.com/shirts.php', {
    // Fetch the blog pages
   links: {
        listItem: '.products li',
        name: 'pages',
        data: {
            url: {
                selector: 'a',
                attr: 'href'
            }
        }
    }
}, (err, { data }) => {
    for (var key in data.links) {
      let tempUrl = 'http://shirts4mike.com/'+data.links[key].url;
      let test = new Date();
      scrapeIt(tempUrl, {
        title: {
          selector: '.shirt-picture img',
          attr: 'alt'
        },
        imageUrl: {
          selector: '.shirt-picture img',
          attr: 'src'
        },
        price: '.price'
      }, (err, {data}) => {
        data.url = tempUrl;
        data.date = dateFormat(now, 'yyyy-mm-dd');        
        console.log(err || data);
      });
    }
});