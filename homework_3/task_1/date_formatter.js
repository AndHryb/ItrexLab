const StringFormatter = require('./string_formatter.js');

class DateFormatter extends StringFormatter {
  constructor(value) {
    super();
    this.value = value;
  }

  removeNonUniqueChars() {
    function removeDuplicatesDate(strElem, i, strElemArray) {
      return ((strElemArray.indexOf(strElem) === i && strElem.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/))
                || !(strElem.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)));
    }

    return this.value.split(' ').filter(removeDuplicatesDate).join(' ');
  }
}

module.exports = DateFormatter;
