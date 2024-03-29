const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var questions = [{
    type:'input',
    name: 'name',
    message: 'What is the team members name?'
},
{   type: 'input',
    name: 'id',
    message: 'What is the team members ID?'
},
{   type: 'input',
    name: 'email',
    message: 'What is the team members email address?'
},{
    type: 'list',
    name: 'role',
    message: 'What is your role?',
    choices: ['Manager', 'Engineer', 'Intern']
}];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//*switch case or default "no further additions" to render function

function init() {
const employees = [];
inquirer.prompt(questions)
.then(function({name, id, email, role}) {
let roleInfo = "";
if (role === "Engineer"){
    roleInfo = "GitHub username";
}
else if (role === "Manager"){
    roleInfo = "office number";
}
else {
    roleInfo = 'school'
}

inquirer.prompt([{
    message: `Enter team member's ${roleInfo}`,
    name: "roleInfo"
},
{
    type: "list",
    message: "Would you like to add more team members?",
    choices: [
        "yes",
        "no"
    ],
    name: "moreMembers"
}])
.then(function({roleInfo, moreMembers}){
    let newMember;
    if (role === 'Engineer'){
        newMember = new Engineer(name, id, email, roleInfo);
        } else if (role==='Intern') {
            newMember = new Intern(name, id, email, roleInfo);
        }
        else {
            newMember = new Manager(name, id, email, roleInfo);
        }
    employees.push(newMember);
    render(newMember);
  
    })  .then(function() {
        if (moreMembers === 'yes'){
            init();
        } else {
            return;
        }
})
}) 
}
 

init();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

//functions for manager, employee, 


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
