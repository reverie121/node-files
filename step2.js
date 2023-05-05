// STEP 1
// In step1.js, write a function, cat.
// It should take one argument, path, and it should read the file with that path, and print the contents of that file.
// Then, write some code that calls that function, allowing you to specify the path argument via the command line.

const fs = require('fs');
const process = require('process');

// Read a file and print its contents
function cat(path) {
    console.debug(`Running cat function on ${path}.`);
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


// STEP 2
// Copy over your step1.js code to step2.js
// Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.
// Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

const axios = require('axios');
const URL = require("url").URL;

// Read a website and print its contents
async function webCat(path) {
    console.debug(`Running webCat function on ${path}.`);
    try {
        const response = await axios.get(path);
        console.log(response.data);
    } catch (error) {
        console.error(`Error reading ${path}: ${error}`);
        process.exit(1);
    }
}

// Validate string as a URL
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
async function callCat(path) {
    if (validateURL(path)) {
        webCat(path);
    }
    else {
        cat(path);
    }
}

callCat(arg[2]);

