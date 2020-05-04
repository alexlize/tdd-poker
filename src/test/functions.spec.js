import { compareHand } from "../functions.js";

describe("Highest card", () => {
  test("hand one has same value like hand two", () => {
    expect(
      compareHand(
        ["2S", "3C", "4C", "5C", "7C"],
        ["2H", "3D", "4D", "5D", "7D"]
      ).winner
    ).toBe(0);

    expect(
      compareHand(
        ["2S", "3C", "4C", "5C", "AC"],
        ["2H", "3D", "4D", "5D", "AD"]
      ).winner
    ).toBe(0);
  });

  test("hand one is stronger than hand two", () => {
    expect(
      compareHand(
        ["2C", "3C", "4C", "5C", "9C"],
        ["2D", "3D", "4D", "5D", "7D"]
      ).winner
    ).toBe(1);

    expect(
      compareHand(
        ["2C", "3C", "4C", "5C", "AC"],
        ["2D", "3D", "4D", "5D", "TD"]
      ).winner
    ).toBe(1);

    expect(
      compareHand(
        ["2C", "3C", "4C", "5C", "AS"],
        ["2D", "3D", "4D", "5D", "TS"]
      ).winner
    ).toBe(1);

    expect(
      compareHand(
        ["AC", "3C", "4C", "5C", "9S"],
        ["2D", "3D", "4D", "5D", "TS"]
      ).winner
    ).toBe(1);

    expect(
      compareHand(
        ["AC", "3C", "4C", "KC", "9S"],
        ["2D", "7D", "4D", "5D", "AS"]
      ).winner
    ).toBe(1);
  });

  test("hand two is stronger than hand one", () => {
    expect(
      compareHand(
        ["2S", "3C", "4C", "5C", "7C"],
        ["2H", "3D", "4D", "5D", "8D"]
      ).winner
    ).toBe(-1);

    expect(
      compareHand(
        ["2S", "3C", "4C", "5C", "7C"],
        ["2H", "3D", "4D", "5D", "TD"]
      ).winner
    ).toBe(-1);

    expect(
      compareHand(
        ["2S", "3C", "4C", "5C", "7C"],
        ["2H", "3D", "4D", "5D", "AS"]
      ).winner
    ).toBe(-1);

    expect(
      compareHand(
        ["2S", "3C", "4C", "5C", "7C"],
        ["2H", "AS", "4D", "5D", "AD"]
      ).winner
    ).toBe(-1);
  });
});

describe("Pair", () => {
  test("pair hand is stronger than second hand with higher card", () => {
    expect(
      compareHand(
        ["2C", "2D", "4C", "5C", "6C"],
        ["AS", "3D", "4D", "5D", "7D"]
      ).winner
    ).toBe(1);
  });

  expect(
    compareHand(["2S", "3D", "2D", "5C", "6C"], ["AH", "3D", "4D", "5D", "7D"])
      .winner
  ).toBe(1);
});

test("pair hand is stronger than first hand with higher card", () => {
  expect(
    compareHand(["AS", "3D", "4D", "5D", "7D"], ["2H", "2D", "4C", "5C", "6C"])
      .winner
  ).toBe(-1);

  expect(
    compareHand(["AS", "3D", "4D", "5D", "7D"], ["2H", "3D", "2D", "5C", "6C"])
      .winner
  ).toBe(-1);
});

test("two pair hands are equal strong", () => {
  expect(
    compareHand(["2H", "2S", "4D", "5D", "6S"], ["2C", "2D", "4C", "5C", "6C"])
      .winner
  ).toBe(0);
});

test("two pair hands : first pair is stronger than second", () => {
  expect(
    compareHand(["6H", "6S", "4D", "5D", "9D"], ["2C", "2D", "4C", "5C", "6C"])
      .winner
  ).toBe(1);
});

test("two pair hands : pairs are same, first hand has higher kicker", () => {
  expect(
    compareHand(["2H", "2S", "4D", "5D", "9S"], ["2C", "2D", "4C", "5C", "6C"])
      .winner
  ).toBe(1);

  expect(
    compareHand(["AH", "AS", "4D", "5D", "QS"], ["AC", "AD", "4C", "5C", "9C"])
      .winner
  ).toBe(1);

  expect(
    compareHand(["AH", "AS", "4D", "6D", "QS"], ["AC", "AD", "4C", "5C", "QC"])
      .winner
  ).toBe(1);
});

test("two pair hands : pairs are same, second hand has higher kicker", () => {
  expect(
    compareHand(["2H", "2S", "4D", "5D", "9S"], ["2C", "2D", "4C", "5C", "AC"])
      .winner
  ).toBe(-1);

  expect(
    compareHand(["AH", "AS", "4D", "5D", "9S"], ["AC", "AD", "4C", "5C", "KC"])
      .winner
  ).toBe(-1);

  expect(
    compareHand(["AH", "AS", "2D", "5D", "9S"], ["AC", "AD", "3C", "5C", "9C"])
      .winner
  ).toBe(-1);
});

test("two pair hands : pairs are same, all kickers are same", () => {
  expect(
    compareHand(["AH", "AS", "2D", "5D", "9S"], ["AC", "AD", "2C", "5C", "9C"])
      .winner
  ).toBe(0);

  expect(
    compareHand(["2S", "AH", "2D", "5D", "9S"], ["2C", "AD", "2H", "5C", "9C"])
      .winner
  ).toBe(0);
});

describe("Two Pairs", () => {
  test("Player 1 wins with two pairs", () => {
    expect(
      compareHand(
        ["2H", "2S", "5H", "5D", "9S"],
        ["AC", "AD", "2C", "5C", "9C"]
      ).winner
    ).toBe(1);
  });

  test("Player 2 wins with two pairs", () => {
    expect(
      compareHand(
        ["2H", "2S", "3H", "5D", "9S"],
        ["AC", "AD", "5S", "5C", "9C"]
      ).winner
    ).toBe(-1);
  });

  test("Player 2 wins with higher pair", () => {
    expect(
      compareHand(
        ["2H", "2S", "5H", "5D", "9S"],
        ["2C", "2D", "6S", "6C", "9C"]
      ).winner
    ).toBe(-1);
  });

  test("Player 2 wins with two pairs and hihgher kicker", () => {
    expect(
      compareHand(
        ["2H", "2S", "5H", "5D", "9S"],
        ["2C", "2D", "5S", "5C", "TC"]
      ).winner
    ).toBe(-1);
  });

  test("Player 2 wins with two pairs and hihgher second pair", () => {
    expect(
      compareHand(
        ["2H", "2S", "5H", "5D", "AS"],
        ["3C", "3D", "5S", "5C", "TC"]
      ).winner
    ).toBe(-1);
  });

  test("split pot", () => {
    expect(
      compareHand(
        ["2H", "2S", "5H", "5D", "AS"],
        ["2D", "2C", "5S", "5C", "AH"]
      ).winner
    ).toBe(0);
  });
});

describe("Three of a kind", () => {
  test("Player 1 wins", () => {
    expect(
      compareHand(
        ["2H", "2S", "2H", "5D", "9S"],
        ["AC", "AD", "7C", "9D", "9C"]
      ).winner
    ).toBe(1);
  });

  test("Player 2 wins", () => {
    expect(
      compareHand(
        ["2H", "2S", "4H", "5D", "9S"],
        ["AC", "AD", "AS", "9D", "TC"]
      ).winner
    ).toBe(-1);
  });

  test("Player 2 wins with higher three of a kind", () => {
    expect(
      compareHand(
        ["2H", "2S", "2D", "5D", "9S"],
        ["AC", "AD", "AS", "9D", "TC"]
      ).winner
    ).toBe(-1);
  });

  test("Player 1 wins with higher three of a kind", () => {
    expect(
      compareHand(
        ["AC", "AD", "AS", "9D", "TC"],
        ["2H", "2S", "2D", "5D", "9S"]
      ).winner
    ).toBe(1);
  });
});

describe("Straight", () => {
  test("Player 1 wins with an Staight 1 to 5 vs three of a kind", () => {
    expect(
      compareHand(
        ["2H", "3S", "4H", "5D", "6S"],
        ["AC", "AD", "AH", "9D", "8C"]
      ).winner
    ).toBe(1);
  });

  test("Player 1 wins with a straight vs three of a kind", () => {
    expect(
      compareHand(
        ["2H", "3S", "4H", "5D", "6S"],
        ["AC", "AD", "AH", "9D", "8C"]
      ).winner
    ).toBe(1);
  });

  test("Player 2 wins with a stronger straight", () => {
    expect(
      compareHand(
        ["2H", "3S", "4H", "5D", "AS"],
        ["2C", "3D", "4H", "5C", "6C"]
      ).winner
    ).toBe(-1);
  });
});

describe("Flush", () => {
  test("Player 1 wins with a Flush", () => {
    expect(
      compareHand(
        ["2C", "3C", "5C", "KC", "JC"],
        ["2H", "3S", "4H", "5D", "6S"]
      ).winner
    ).toBe(1);
  });

  test("Player 1 wins with a Flush", () => {
    expect(
      compareHand(
        ["9C", "3C", "5C", "KC", "JC"],
        ["2H", "3S", "4H", "5D", "6S"]
      ).winner
    ).toBe(1);
  });

  test("Player 1 wins with a better Flush", () => {
    expect(
      compareHand(
        ["9C", "3C", "5C", "KC", "JC"],
        ["2H", "9H", "4H", "5H", "6H"]
      ).winner
    ).toBe(1);
  });

  test("Player 2 wins with a better Flush", () => {
    expect(
      compareHand(
        ["9C", "3C", "5C", "KC", "JC"],
        ["2H", "3H", "4H", "5H", "AH"]
      ).winner
    ).toBe(-1);
  });

  test("Split pot", () => {
    expect(
      compareHand(
        ["9C", "3C", "5C", "KC", "JC"],
        ["9H", "3H", "5H", "KH", "JH"]
      ).winner
    ).toBe(0);
  });

  test("Player 2 wins with a better Flush", () => {
    expect(
      compareHand(
        ["9C", "3C", "5C", "2C", "AC"],
        ["2H", "3H", "4H", "TH", "AH"]
      ).winner
    ).toBe(-1);
  });
});

describe("Full House", () => {
  test("Player 1 wins with a Full House", () => {
    expect(
      compareHand(
        ["2H", "2S", "4H", "4D", "4S"],
        ["AC", "AD", "KH", "KD", "8C"]
      ).winner
    ).toBe(1);
  });

  test("Player 1 wins with higher Full House ( Trhee of a Kind)", () => {
    expect(
      compareHand(
        ["2D", "2C", "KH", "KD", "KC"],
        ["2H", "2S", "4H", "4D", "4S"]
      ).winner
    ).toBe(1);
  });
  test("Hold 'em : Player split with same Full House", () => {
    expect(
      compareHand(
        ["2D", "2C", "KH", "KD", "KC"],
        ["2H", "2S", "KH", "KD", "KC"]
      ).winner
    ).toBe(0);
  });
  test("Hold 'em : Player 2 wins with higher Full House (Pair)", () => {
    expect(
      compareHand(
        ["2D", "2C", "KH", "KD", "KC"],
        ["3H", "3S", "KH", "KD", "KC"]
      ).winner
    ).toBe(-1);
  });
});

describe("Four of a kind", () => {
  test("Player 1 wins with a Four of a kind", () => {
    expect(
      compareHand(
        ["2H", "4C", "4H", "4D", "4S"],
        ["AC", "AD", "KH", "KD", "8C"]
      ).winner
    ).toBe(1);
  });

  test("Player 2 wins with higher Four of a kind", () => {
    expect(
      compareHand(
        ["2H", "4C", "4H", "4D", "4S"],
        ["AC", "AD", "AH", "AD", "2S"]
      ).winner
    ).toBe(-1);
  });
});

describe("Straight Flush", () => {
  test("Player 1 wins with a straight flush", () => {
    expect(
      compareHand(
        ["2H", "3H", "4H", "5H", "6H"],
        ["AC", "AD", "KH", "KD", "KC"]
      ).winner
    ).toBe(1);
  });

  test("Player 2 wins with higher straight flush", () => {
    expect(
      compareHand(
        ["2H", "3H", "4H", "5H", "6H"],
        ["TC", "JC", "QC", "KC", "AC"]
      ).winner
    ).toBe(-1);
  });

  test("Player 2 wins with higher straight flush", () => {
    expect(
      compareHand(
        ["AH", "3H", "4H", "5H", "2H"],
        ["TC", "JC", "QC", "KC", "9C"]
      ).winner
    ).toBe(-1);
  });

  test("Player 1 wins with royal flush", () => {
    expect(
      compareHand(
        ["TH", "JH", "QH", "KH", "AH"],
        ["TC", "JC", "QC", "KC", "9C"]
      ).winner
    ).toBe(1);
  });
});
