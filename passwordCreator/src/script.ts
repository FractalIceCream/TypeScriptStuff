const specialCharacters: string[] = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.',
];

const numericCharacters: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const lowerCasedCharacters: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const upperCasedCharacters: string[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

type passwordOptions = {
  length: number,
  hasSpecialCharacters: boolean,
  hasNumericCharacters: boolean,
  hasLowerCasedCharacters: boolean,
  hasUpperCasedCharacters: boolean
};

function getPasswordOptions (): passwordOptions|null{
    const length: number = parseInt(
      prompt('How many characters would you like your password to contain?')!,
      10
    );  

  if (typeof length !== 'number') {  
    alert('Password length must be provided as a number');
    return null;
  }
  
  if (length < 8) {
    alert('Password length must be at least 8 characters');
    return null;
  }

  if (length > 128) {
    alert('Password length must less than 129 characters');
    return null;
  }

  const hasSpecialCharacters: boolean = confirm('Click OK to confirm including special characters.');
  const hasNumericCharacters: boolean = confirm('Click OK to confirm including numeric characters');
  const hasLowerCasedCharacters: boolean = confirm('Click OK to confirm including lowercase characters.');
  const hasUpperCasedCharacters: boolean = confirm('CLick OK to confirm including uppercase characters.');

  if ( !hasSpecialCharacters && !hasNumericCharacters && !hasLowerCasedCharacters && !hasUpperCasedCharacters) {
    alert('Must select as least one character type');
    return null;
  }

  const passwordOptions = {
    length, hasSpecialCharacters, hasNumericCharacters, hasLowerCasedCharacters, hasUpperCasedCharacters
  };
  return passwordOptions;

}

function getRandom (arr: string[]): string {
  const randIndex: number = Math.floor(Math.random() * arr.length);
  const randElement: string = arr[randIndex];
  return randElement;
}

function generatePassword(): string {
  const options = getPasswordOptions()!;
  let result: string[] = [];
  let possibleCharacters: string[] = [];
  let guaranteedCharacters: string[] = [];

  if(!options) null;

  if(options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  if(options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if(options.hasLowerCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if(options.hasUpperCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  for (let i = 0; i < options.length; i++) {
    let possibleCharacter: string = getRandom(possibleCharacters!);
    result.push(possibleCharacter);
  }

  for (let i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }
  return result.join('');
}

const generateBtn = document.querySelector('#generate') as HTMLButtonElement;

function writePassword() {
  const password: string = generatePassword();
  const passwordText = document.querySelector('#password') as HTMLTextAreaElement;

  passwordText.value = password;
}

generateBtn.addEventListener('click', writePassword);
