// STEP 1
// In step1.js, write a function, cat.
// It should take one argument, path, and it should read the file with that path, and print the contents of that file.
// Then, write some code that calls that function, allowing you to specify the path argument via the command line.

const fs = require('fs');
const process = require('process');

// If write request, write data to file.
function writeToFile(writePath, data) {
    fs.writeFile(writePath, data, 'utf8', (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        // If no error while writing to file, print success message in console.
        console.debug(`Writing data to file ${writePath}.`);
    });
}

// Read a file and print its contents
function cat(readPath, outputRequest, writePath) {
    console.debug(`Running cat function on ${readPath}.`);
    fs.readFile(readPath,'utf8', (error, data) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        // If no error while reading file, print the data to console or write to file as appropriate.
        if (outputRequest) {
            // If write request, write data to file.
            writeToFile(writePath,data);
        } else {
            // If no write request, print data to console.
            console.log(data);
        }
    });
}

// Get process argument from command line and run cat with that variable.
const arg = process.argv


// STEP 2
// Copy over your step1.js code to step2.js
// Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.
// Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

const axios = require('axios');
const URL = require("url").URL;

// Read a website and print its contents
async function webCat(readPath, outputRequest, writePath) {
    console.debug(`Running webCat function on ${readPath}.`);
    try {
        const response = await axios.get(readPath);
        if (outputRequest) {
            writeToFile(writePath,response.data);
        } else {
            console.log(response.data);
        }
    } catch (error) {
        console.error(`Error reading ${readPath}: ${error}`);
        process.exit(1);
    }
}

// Validate string as a URL, returning a boolean.
function validateURL(path) {
    console.debug(`Validating ${path} as URL.`);
    try {
        new URL(path);
        console.debug(`${path} appears to be a URL.`);
        return true;
    } catch (err) {
        console.debug(`${path} is not a URL.`);
        return false;
    }
}

// If path is a URL run webCat function, otherwise run cat function.
async function callCat(readPath, outputRequest, writePath) {
    if (validateURL(readPath)) {
        webCat(readPath, outputRequest, writePath);
    }
    else {
        cat(readPath, outputRequest, writePath);
    }
}

// STEP 3
// Copy over your step2.js code to step3.js.
// Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url.
// Current features should still work the same:

// Look for output request and then call callCat function.
function checkForOutputRequest(args) {
    if (args[2] == '--out') {
        callCat(args[4],true,args[3]);
    } else {
        callCat(args[2],false);
    }
}


// Run it all.
checkForOutputRequest(arg);