const StringFormatter = require('./string_formatter.js');

class StringOfStringFormatter extends StringFormatter {
  constructor(value, removeString) {
    super();
    this.value = value;
    this.regEx = new RegExp(removeString, 'g');
  }

  removeNonUniqueChars() {
    return this.value.replace(this.regEx, '');
  }
}

module.exports = StringOfStringFormatter;
