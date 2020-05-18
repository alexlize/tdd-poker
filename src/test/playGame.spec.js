import { playGame } from "../playGame.js";

const handHighCard9 = ["2C", "3C", "4C", "5C", "9S"];
const handHighCard7 = ["2D", "3D", "4D", "5D", "7C"];

const handOnePairOf2 = ["2D", "2S", "4D", "5D", "7C"];
const handOnePairOfA = ["AD", "AS", "4D", "5D", "7C"];

const handTwoPairOf2And4 = ["2D", "2S", "4D", "4S", "7C"];

const fourOfAKind = ["3D", "3S", "3C", "3H", "7C"];
// const handHighCard7 = ["2D", "3D", "4D", "5D", "7C"];

describe("High card", () => {
  test("hand 1 wins with high card", () => {
    expect(playGame([handHighCard9, handHighCard7])).toBe(
      "Player 1 wins. - with High Card"
    );
  });

  test("hand 2 wins with high card", () => {
    expect(playGame([handHighCard7, handHighCard9])).toBe(
      "Player 2 wins. - with High Card"
    );
  });

  test("Tie.", () => {
    expect(playGame([handHighCard7, handHighCard7])).toBe("Tie.");
  });
});

describe("One Pair", () => {
  test("hand 1 wins with one Pair", () => {
    expect(playGame([handOnePairOf2, handHighCard7])).toBe(
      "Player 1 wins. - with One Pair"
    );
  });

  test("hand 2 wins with one Pair", () => {
    expect(playGame([handHighCard7, handOnePairOf2])).toBe(
      "Player 2 wins. - with One Pair"
    );
  });

  test("one Pair tie", () => {
    expect(playGame([handOnePairOf2, handOnePairOf2])).toBe("Tie.");
  });
});

describe("Two Pair", () => {
  test("hand 1 wins", () => {
    expect(playGame([handTwoPairOf2And4, handHighCard7])).toBe(
      "Player 1 wins. - with Two Pairs"
    );
  });

  test("hand 2 wins", () => {
    expect(playGame([handHighCard7, handTwoPairOf2And4])).toBe(
      "Player 2 wins. - with Two Pairs"
    );
  });

  test("tie", () => {
    expect(playGame([handTwoPairOf2And4, handTwoPairOf2And4])).toBe("Tie.");
  });

  test("4ofAKind", () => {
    expect(playGame([fourOfAKind, handTwoPairOf2And4])).toBe(
      "Player 1 wins. - with Four of a kind"
    );
  });

  test("4ofAKindBoth", () => {
    expect(playGame([fourOfAKind, fourOfAKind])).toBe("Tie.");
  });

  test("Calculate method : hand 1 wins with high card", () => {
    expect(playGame([handOnePairOfA, handHighCard7])).toBe(
      "Player 1 wins. - with One Pair"
    );
  });
});
