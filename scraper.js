const http = require('http');
const fs = require('fs');
const scrapeIt = require('scrape-it');
const dateFormat = require('dateformat');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const hostname = '127.0.0.1';
const port = 3000;
let now = new Date();
let today = dateFormat(now, 'yyyy-mm-dd');
let records = [];

//== CsvWriter configuration
const csvWriter = createCsvWriter({
  path: 'data/'+today+'.csv',
  header: [
      {id: 'title', title: 'TITLE'},
      {id: 'imageUrl', title: 'IMAGEURL'},
      {id: 'price', title: 'PRICE'},
      {id: 'url', title: 'URL'},
      {id: 'date', title: 'DATE'}
  ]
});

//== File streaming (make directory content and add file)

fs.readdir('data', (err, files) => {
  // If there is a file in the folder we delete it
  if(files){
    fs.unlink('data/'+files, (err) => {
      if (err) {
        console.log('Cannot reach file, operation not permitted');
      } else {
        console.log('data/'+files+' was deleted');
      }
    });
  } else {
    console.log('File has been created');
  }
  // If directory reading is not possible, then error is thrown so... I take advantage from that to create the folder and do nothing if folder doesn't exist //
  if(err) {
    fs.mkdir('data', () => {
      console.log('Data folder created');
    });        
  } else {
    console.log('Data folder already exist');
  }
});

try {
  //== Use http://shirts4mike.com/shirts.php as single entry point to scrape information for 8 tee-shirts from the site
  scrapeIt('http://shirts4mike.com/shirts.php', {
      // Fetch the blog pages and create an object of links
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
      // After getting that "link's object" use data object to scrape price, title, url and image url save this information into a CSV file name formated like: YYYY-MM-DD.csv.
  }, (err, { data }) => {
      // For each data entry
      for (let i = 0; i < data.links.length; i++) {
        let tempUrl = 'http://shirts4mike.com/'+data.links[i].url;
        // call scrape it then construct object (price, title, url, img, image-url)
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

          //== Finalize the object with latest data
          // Add page URL
          data.url = tempUrl;
          // Add timestamp
          data.date = today;      
        
        // Make the object for each line of the csv file
        let record = {
          title: data.title,
          imageUrl: data.imageUrl,
          price: data.price,
          url: data.url,
          date: data.date         
        }
        
        // Push object to make records array
        records.push(record);

        // Write object record to the csv file
        csvWriter.writeRecords(records);
        });
      }
  });
} catch (error) {
  if(error.code === 'ERR_ASSERTION') {
    console.error(`Cannot connect to Tshirts 4 mike\nReason: ${error.message}`);
  }
}