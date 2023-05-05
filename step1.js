const fs = require('fs');
const process = require('process');

// Read a file and print its contents
function cat(path) {
    fs.readFile(path,'utf8', (error, data) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        // If no error, print the data to console
        console.log(data);
    });
}

// Get process argument from command line and run cat with that variable.
const arg = process.argv
// Arguments begin at the third item in process.argv array
cat(arg[2]);