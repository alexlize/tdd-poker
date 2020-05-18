class Card {
  constructor(str) {
    this.value = str.substr(0, 1);
    this.suit = str.substr(1, 1);
  }
}
