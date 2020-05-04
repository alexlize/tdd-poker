import { compareHand } from "./functions.js";

export const playGame = hands => {
  /**
    result {
      winner: [1,0,-1]
      handStrengthName: 'On Pair'
    }     

   */
  const result = compareHand(hands[0], hands[1]);

  if (result.winner === 0) {
    return "Tie.";
  }

  return `Player ${result.winner === 1 ? 1 : 2} wins. - with ${
    result.handStrengthName
  }`;
};
