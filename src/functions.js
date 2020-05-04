/**
 * returns {winner, handStrengthName}
 */
export const compareHand = (handA, handB) => {
  console.log(
    "---------------------------------------------------------------------------------------"
  );
  const handAValues = handA.map(c => getCardValue(c));
  const handStrengthA = getHandStrength(handA);
  console.log(
    `Player A has hand ${handA} (values ${handAValues}) with strength ${
      handStrengthA.strength
    }`
  );

  const handBValues = handB.map(c => getCardValue(c));
  const handStrengthB = getHandStrength(handB);
  console.log(
    `Player B has hand ${handB} (values ${handBValues}) with strength ${
      handStrengthB.strength
    }`
  );

  let result = null;
  if (handStrengthA.strength !== handStrengthB.strength) {
    result = compare(handStrengthA.strength, handStrengthB.strength);
  } else {
    result = handStrengthA.resolver(handAValues, handBValues);
  }

  return {
    winner: result,
    handStrengthName: result === 1 ? handStrengthA.name : handStrengthB.name
  };
};

function compareThree(handAValues, handBValues) {
  const highestMatchAValue = getXofAKindValue(handAValues, 3);
  const highestMatchBValue = getXofAKindValue(handBValues, 3);
  return compare(highestMatchAValue, highestMatchBValue);
}

function compareTwoPairs(handAValues, handBValues) {
  const highestAPairValue = getXofAKindValue(handAValues, 2);
  const highestBPairValue = getXofAKindValue(handBValues, 2);

  if (highestAPairValue === highestBPairValue) {
    const filteredA = handAValues.filter(v => v !== highestAPairValue);
    const filteredB = handBValues.filter(v => v !== highestBPairValue);
    return comparePairs(filteredA, filteredB);
  }
  return comparePairs(handAValues, handBValues);
}

function comparePairs(handAValues, handBValues) {
  const highestAPairValue = getXofAKindValue(handAValues, 2);
  const highestBPairValue = getXofAKindValue(handBValues, 2);

  if (highestAPairValue === highestBPairValue) {
    const filteredA = handAValues.filter(v => v !== highestAPairValue);
    const filteredB = handBValues.filter(v => v !== highestBPairValue);

    return getWinnerKicker(filteredA, filteredB);
  }

  return compare(highestAPairValue, highestBPairValue);
}

function getWinnerKicker(handAValues, handBValues) {
  if (handAValues.length === 0) return 0;

  const maxA = Math.max(...handAValues);
  const maxB = Math.max(...handBValues);

  if (maxA === maxB) {
    const filteredA = handAValues.filter(v => v !== maxA);
    const filteredB = handBValues.filter(v => v !== maxA);

    return getWinnerKicker(filteredA, filteredB);
  }
  if (maxA < maxB) return -1;

  return 1;
}

function getXofAKindValue(handValues, count) {
  let handValuesFacet = handValues.reduce(
    (a, b) => a.set(b, a.get(b) + 1 || 1),
    new Map()
  );

  const cardValueArray = [...handValuesFacet.entries()]
    .filter(([cardValue, n]) => n === count)
    .map(([cardValue, n]) => cardValue);

  return Math.max(...cardValueArray);
}

function pairExists(handValue) {
  return new Set(handValue).size < 5;
}

function getHandStrength(hand) {
  const handValues = hand.map(c => getCardValue(c));

  if (straightFlushExists(hand, handValues)) {
    return handStrengths[8];
  }

  if (fourOfAKindExists(handValues)) {
    return handStrengths[7];
  }

  if (fullHouseExists(handValues)) {
    return handStrengths[6];
  }

  if (flushExists(hand)) {
    return handStrengths[5];
  }

  if (straightExists(handValues)) {
    return handStrengths[4];
  }

  if (threeOfAKindExists(handValues)) {
    return handStrengths[3];
  }

  if (doublePairExists(handValues)) {
    return handStrengths[2];
  }

  if (pairExists(handValues)) {
    return handStrengths[1];
  }

  return handStrengths[0];
}

function straightFlushExists(hand, handValues) {
  return flushExists(hand) && straightExists(handValues);
}

function fourOfAKindExists(handValues) {
  return xOfAKindExists(handValues, 4);
}

function fullHouseExists(handValues) {
  return xOfAKindExists(handValues, 3) && xOfAKindExists(handValues, 2);
}

function flushExists(hand) {
  const color = hand[0][1];
  console.log("color is: ", color);
  return hand.every(card => card[1] === color);
}

function straightExists(handValues) {
  const sortedHandValuesDesc = handValues.sort((a, b) => b - a);
  console.log("SORTED Descending :", sortedHandValuesDesc);

  if (sortedHandValuesDesc[0] === 12 && sortedHandValuesDesc.includes(2)) {
    console.log("Special case");
    return (
      JSON.stringify(sortedHandValuesDesc) === JSON.stringify([12, 3, 2, 1, 0])
    );
  }

  for (let i = 1; i < sortedHandValuesDesc.length; i++) {
    if (sortedHandValuesDesc[i - 1] - sortedHandValuesDesc[i] !== 1)
      return false;
  }
  return true;
}
function threeOfAKindExists(handValues) {
  return xOfAKindExists(handValues, 3);
}

function doublePairExists(handValues) {
  return new Set(handValues).size < 4;
}

function xOfAKindExists(handValues, x) {
  let handValuesFacet = handValues.reduce(
    (a, b) => a.set(b, a.get(b) + 1 || 1),
    new Map()
  );

  return [...handValuesFacet.entries()].some(
    ([cardValue, count]) => count === x
  );
}

class HandStrength {
  constructor(strength, name, resolver) {
    this.strength = strength;
    this.name = name;
    this.resolver = resolver;
  }
}

const handStrengths = [
  new HandStrength(1, "High Card", getWinnerKicker),
  new HandStrength(2, "One Pair", comparePairs),
  new HandStrength(3, "Two Pairs", compareTwoPairs),
  new HandStrength(4, "Three of a kind", compareThree),
  new HandStrength(5, "Straight", compareStraights),
  new HandStrength(6, "Flush", compareFlush),
  new HandStrength(7, "Full House", compareFullHouse),
  new HandStrength(8, "Four of a kind", compareFourOfAKind),
  new HandStrength(9, "Straight Flush", compareStraightFlush)
];

function compareStraightFlush(handAValues, handBValues) {
  return compareStraights(handAValues, handBValues);
}

function compareFlush(handAValues, handBValues) {
  return getWinnerKicker(handAValues, handBValues);
}

function compareFourOfAKind(handAValues, handBValues) {
  const highestAFourOfKindValue = getXofAKindValue(handAValues, 4);
  const highestBFourOfKindValue = getXofAKindValue(handBValues, 4);
  return compare(highestAFourOfKindValue, highestBFourOfKindValue);
}

function compareFullHouse(handAValues, handBValues) {
  const highestAThreeOfKindValue = getXofAKindValue(handAValues, 3);
  const highestBThreeOfKindValue = getXofAKindValue(handBValues, 3);

  if (highestAThreeOfKindValue === highestBThreeOfKindValue) {
    const filteredA = handAValues.filter(v => v !== highestAThreeOfKindValue);
    const filteredB = handBValues.filter(v => v !== highestBThreeOfKindValue);

    return comparePairs(filteredA, filteredB);
  }

  return compareThree(handAValues, handBValues);
}

function compareStraights(handAValues, handBValues) {
  return getWinnerKicker(
    staightenMeUp(handAValues),
    staightenMeUp(handBValues)
  );
}

function staightenMeUp(handValues) {
  const sortedHandValuesDesc = handValues.sort((a, b) => b - a);
  console.log("SORTED Descending  :", sortedHandValuesDesc);

  if (sortedHandValuesDesc[0] === 12 && sortedHandValuesDesc.includes(2)) {
    sortedHandValuesDesc[0] = -1;
  }
  return sortedHandValuesDesc;
}

const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

function getCardValue(card) {
  return cards.indexOf(card[0]);
}

function compare(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}
