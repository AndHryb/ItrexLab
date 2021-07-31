const StringFormatter = require('./string_formatter.js');

class NumberFormatter extends StringFormatter {
  constructor(value) {
    super();
    this.value = value;
  }

  removeNonUniqueChars() {
    return this.value.split('').filter((strElem, i, strElemArray) => (strElemArray.indexOf(strElem) === i || strElem.match(/\D/))).join('');
  }
}
module.exports = NumberFormatter;
