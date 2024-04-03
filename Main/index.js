const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./lib/shapes');

class CLI {
  async run() {
    try {
      const userInput = await inquirer.prompt([
        {
          type: 'input',
          name: 'text',
          message: 'Enter text (up to three characters):',
          validate: function(input) {
            return input.length <= 3 ? true : 'Text must be up to three characters.';
          }
        },
        {
          type: 'input',
          name: 'textColor',
          message: 'Enter text color (color keyword or hexadecimal number):'
        },
        {
          type: 'list',
          name: 'shape',
          message: 'Select a shape:',
          choices: ['Triangle', 'Square', 'Circle']
        },
        {
          type: 'input',
          name: 'shapeColor',
          message: 'Enter shape color (color keyword or hexadecimal number):'
        }
      ]);
      
      let shape;
      switch (userInput.shape) {
        case 'Triangle':
          shape = new Triangle();
          break;
        case 'Square':
          shape = new Square();
          break;
        case 'Circle':
          shape = new Circle();
          break;
        default:
          throw new Error('Invalid shape selected');
      }

      shape.setColor(userInput.shapeColor);
      const svgContent = shape.render(userInput.text, userInput.textColor);
      
      fs.writeFileSync('logo.svg', svgContent);
      console.log('Generated SVG logo');
    } catch (error) {
      console.error('An error has occurred:', error);
    }
  }
}

new CLI().run();
