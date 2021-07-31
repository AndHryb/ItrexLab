class StringFormatter {
  constructor(value) {
    this.value = value;
  }

  removeNonUniqueChars() {
    return this.value.split('').filter((strElem, i, strElemArray) => strElemArray.indexOf(strElem) === i).join('');
  }
}

module.exports = StringFormatter;
