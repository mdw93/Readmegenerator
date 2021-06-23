// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

let myIcon = null
let myLink = null
let myImg = null

//Object to pull license info for the readme
const licenseInfo = {
    MIT: [`![License: MIT]https://img.shields.io/badge/License-MIT-yellow.svg`, `https://opensource.org/licenses/MIT`],
    Mozilla: [`![License: MPL 2.0]https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg`, `https://opensource.org/licenses/MPL-2.0`],
    WTFPL: [`![License: WTFPL]https://img.shields.io/badge/License-WTFPL-brightgreen.svg`, `http://www.wtfpl.net/about/`],
    PDDL: [`![License: ODbL]https://img.shields.io/badge/License-PDDL-brightgreen.svg`, `https://opendatacommons.org/licenses/pddl/`],
    ISC: [`![License: ISC]https://img.shields.io/badge/License-ISC-blue.svg`, `https://opensource.org/licenses/ISC)`],
    Eclipse: [`![License]https://img.shields.io/badge/License-EPL%201.0-red.svg`, `https://opensource.org/licenses/EPL-1.0`],
    None: ['', '']
}

//Function to generate the correct license and IMG info for the readme
const createkey = (answers) => {
    let myKey = answers.license ?? 'None'
    myIcon = licenseInfo[myKey][0]
    myLink = licenseInfo[myKey][1]

    myImg = answers.img ?? ''
}


//function that creates the readme based the user answers

function generateReadMe(answers) {
    createkey(answers)
    return `
${answers.title}

${myIcon}

## Description
${answers.description}
## Table of Contents
- [Description](#Description)
- [Installation_instructions](#Installation_instructions)
- [Usage](#Usage)
- [License](#License)
- [Contributors](#Contributors)
- [Testing](#Testing)
- [Questions](#Questions)

## Installation_instructions
${answers.installation_instructions}

## Usage
${answers.usage}

${myImg}

This application is covered by the ${myIcon} license. 

${myLink}

## Contributors
${answers.contributors}

## Testing 
${answers.testing}

## Questions
Email me with any questions: ${answers.email}

GitHub: [${answers.GitHub}](https://github.com/${answers.GitHub})`
}

// TODO: Create an array of questions for user input
const createReadme = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please describe your project.',
        },
        {
            type: 'input',
            name: 'installation_instructions',
            message: 'What is needed to run your project??',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please describe any relevant usage information.',
        },
        {
            type: 'input',
            name: 'img',
            message: 'Please enter an image of video of the deployed project.',
        },
        {
            type: 'input',
            name: 'contributors',
            message: 'What was the team that contributed on this project?',
        },
        {
            type: 'input',
            name: 'testing',
            message: 'Please describe the test instructions for this project.',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Please pick the license for this project.',
            choices: ['MIT', 'Mozilla', 'WTFPL', 'SIL', 'PDDL', 'ISC', 'Eclipse', 'None']
        },
        {
            type: 'input',
            name: 'GitHub',
            message: 'Please enter your GitHub username.',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your email address.',
        },
    ]);
};


// TODO: Create a function to write README file
const writeToFile = util.promisify(fs.writeFile);

// TODO: Create a function to initialize app
const init = () => {
    createReadme()
        .then((answers) => writeToFile('READ.md', generateReadMe(answers)))
        .then(() => console.log('Successfully wrote to read.me'))
        .catch((err) => console.error(err));
}

// Function call to initialize app
init();

/* this was a test array to practice inquier
const myTest = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'license',
            message: 'Please pick the license for this project.',
            choices: ['MIT', 'Mozilla', 'WTFPL', 'SIL', 'PDDL', 'ISC', 'Eclipse', 'None']
        },
    ]);
};
*/

/* This is the answers I used to create the readme file
$ node index.js
? What is the title of your project? Matt's Node Readme Generator
? Please describe your project. Node/Inquirer based readme Generator
? What is needed to run your project?? VSC, Javascript, Inquirer, FS, Util, Node
? Please describe any relevant usage information. Run file in a node terminal and answer all relevant questions
? Please enter an image of video of the deployed project. https://i.picsum.photos/id/774/200/200.jpg?hmac=kHZuEL0Tzh_9wUk4BnU9zxodilE2mGBdAAor2hKpA_w
? What was the team that contributed on this project? Matthew Williams
? Please describe the test instructions for this project. There are no test instructions.
? Please pick the license for this project. WTFPL
? Please enter your GitHub username. mdw93
? Please enter your email address. mdwmdw9393@gmail.com
Successfully wrote to read.me
*/

