let StringFormatter  = require('./string_formatter.js');
let NumberFormatter = require('./numbe_formatter.js');
let DateFormatter = require('./date_formatter.js');
let StringOfStringFormatter = require('./string_of_stringFormatter.js');




const anyString = new StringFormatter('Hello, world!');
console.log(`input ${anyString.value} output ${anyString.removeNonUniqueChars()}`);

const anyString1 = new NumberFormatter('aaaasdsdsssssgghh    haaaff111111112312234234334345555');
console.log(`input ${anyString1.value} output ${anyString1.removeNonUniqueChars()}`);

const anyString2 = new DateFormatter('Hello, 11/01/2021 11/01/2021 11/01/2021 world!');
console.log(`input ${anyString2.value} output ${anyString2.removeNonUniqueChars()}`);

const anyString3 = new StringOfStringFormatter('Hello, world! Hello, world! Hello, world!', 'ello');
console.log(`input ${anyString3.value} output ${anyString3.removeNonUniqueChars()}`);