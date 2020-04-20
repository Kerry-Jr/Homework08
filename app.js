const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

inquirer.prompt([
    {
        type: 'list',
        message: 'What is your role?',
        name: 'role',
        choices: [
            'Manager',
            'Intern',
            'Engineer'
        ]
    },
    {
        type: 'input',
        message: 'What is your name?',
        name: 'name'
    },
    {
        type: 'input',
        message: 'What is your ID number?',
        name: 'id'
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email'
    }
]).then(async data => {
    if (data.role === 'Manager') {
        await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the office number?',
                name: 'officeNumber'
            }

        ]).then(function (response) {
            const manager = new Manager(data.name, data.id, data.email, response.officeNumber);
            roster.push(manager);
        })

    } else if (data.role === 'Intern') {
        await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of school',
                name: 'school'
            }
        ]).then(function (response) {
            const intern = new Intern(data.name, data.id, data.email, response.school);
            roster.push(intern);

        });

    } else if (data.role === 'Engineer') {
        await inquirer.prompt([
            {
                type: 'input',
                message: 'What is your github username?',
                name: 'github'
            }
        ]).then(function (response) {
            const engineer = new Engineer(data.name, data.id, data.email, response.github);
            roster.push(engineer);

        })

    }
    fs.appendFile(outputPath, render(roster), err => {
        if (err) {
            console.log(err);
            throw err
        }
        console.log('success');
    })
}
);

const roster = [];



// render(roster);




