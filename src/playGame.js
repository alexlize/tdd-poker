import { compareHand } from "./functions.js";

export const playGame = hands => {
  /**
    result {
      winner: [1,0,-1]
      handStrengthName: 'On Pair'
      winningCard
    }     

   */

  const result = compareHand(hands[0], hands[1]);

  if (result.winner === 0) {
    console.log("Tie");
    return "Tie.";
  }

  console.log(
    `Player ${result.winner === 1 ? "A" : "B"} wins. - with ${
      result.handStrengthName
    } - ${result.winningCard}`
  );

  console.log("#####################");

  return `Player ${result.winner === 1 ? 1 : 2} wins. - with ${
    result.handStrengthName
  }`;
};
