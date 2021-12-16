const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(array){
    this._field = array;
  }
  get field(){
    return this._field;
  }
  print(){
    this._field.forEach(element => {
      console.log(element.join(''));
    });
  }
  startPosition(){
    for (let i = 0; i < this._field.length; i++) {
      let index = this._field[i].indexOf(pathCharacter);
      if (index > -1) {
        return [i, index];
      }
    }
  }
  move(direction, position){
    if (direction.length > 1){
      console.log('Input error. Please choose [U]p, [D]own, [L]eft or [R]ight.');
      return;
    } else {
      direction = direction.toLowerCase();
      switch(direction){
        case 'u':
          if(position[0] !== 0){
             position[0] -= 1;
          } else {
            console.log("Can't move up. Please pick another direction.");
            return;
          }
          break;
        case 'd':
          if(position[0] !== (this._field.length+1)){
            position[0] += 1;
          } else {
            console.log("Can't move down. Please pick another direction.");
            return;
          }
          break;
        case 'l':
          if(position[1] !== 0){
            position[1] -= 1;
          } else {
            console.log("Can't move left. Please pick another direction.");
            return;
          }
          break;
        case 'r':
          if(position[1] !== this._field[position[0].length+1]){
            position[1] += 1;
          } else {
            console.log("Can't move right. Please pick another direction.");
            return;
          }
          break;
        default:
          console.log('Input error. Please choose [U]p, [D]own, [L]eft or [R]ight.');
          return;
      }
      //check current position for hat and holes and change it to characterPath.
      let char = this._field[position[0]][position[1]];
      switch(char){
        case hat :
          foundHat = true;
          break;
        case hole :
          foundHole = true;
          break;
        case pathCharacter :
          console.log("Can't go backwards! Choose another direction.");
          break;
        case fieldCharacter :
          this._field[position[0]][position[1]] = pathCharacter;
          currentPosition = position;
          break;
      }
    }
    return;
  }
    static generateField(height, width, percentage) {
    const newField = [];
    for (let i = 0; i < height; i++){
        let row = [];
      for (let j = 0; j < width; j++){
        let rand = Math.floor((Math.random() * 100));
        if (rand <= percentage) {
          row.push(hole);
        } else {
          row.push(fieldCharacter);
        }
      }
      newField.push(row);
    }
    const newStartPos = [];
    const newHatPos = [];
    newStartPos[0] = Math.floor(Math.random() * height);
    newStartPos[1] = Math.floor(Math.random() * width);
    newHatPos[0] = Math.floor(Math.random() * height);
    newHatPos[1] = Math.floor(Math.random() * width);
    newField[newStartPos[0]][newStartPos[1]] = pathCharacter;
    do {
        newHatPos[0] = Math.floor(Math.random() * height);
        newHatPos[1] = Math.floor(Math.random() * width);
    } while (newStartPos[0] === newHatPos[0] && newStartPos[1] === newHatPos[1]);
    newField[newHatPos[0]][newHatPos[1]] = hat;
    return newField;
  }
}

const fieldArray = Field.generateField(6, 12, 33);
const myField = new Field(fieldArray);

let foundHat = false;
let foundHole = false;
let currentPosition = myField.startPosition();
let count = 0;

do {
  count++;
  //ask user for direction
  myField.print();
  const move = prompt('Which direction do you want to move? ');
  myField.move(move, currentPosition);
} while (!foundHat && !foundHole)

if (foundHat) {
  console.log('You have won!');
}
if (foundHole) {
  console.log('You have lost.');
}