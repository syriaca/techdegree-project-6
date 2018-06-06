// ==== Prepare, Plan, Perform, Perfect ==== //

//== Create a command line application app using Node.js For a comparaison prices sites,
//== Should use npm moudule to assist me in project (content scraper & create csv file)
    // At least 1,000 downloads
    // Has been updated in the last six months

//== Scrape a website once a day
    
    //== 1) uses http://shirts4mike.com/shirts.php as single entry point to scrape information for 8 tee-shirts from the site, 
    // without using any hard-coded urls like http://www.shirts4mike.com/shirt.php?id=101

    //== 2) get price, title, url and image url save this information into a CSV file name formated like: YYYY-MM-DD.csv.

    //== 3) the column headers in the CSV need to be in a certain order to be correctly entered into a database. They should be in this order: Title, Price, ImageURL, URL, and Time
    
    //== 4) Save the file ine a folde called "data"
        //= "If" the folder doesn't exist, 
            // create one folder
        //= else 
            // "do nothing"
        // If the script is run twice, the program overwrites the data. The file contains the data from the second call.
    // 5) The program displays a human-friendly error (not just the original error code) 
    //    when it cannot connect to http://shirts4mike.com

