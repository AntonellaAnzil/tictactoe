import { Game, GameStatus } from './interfaces';
import { constantsList } from './utils/constants';

export function status(game: Game): GameStatus {
  let status;
  let winningPlayer;

  const isValid = validGame(game.board.status, game.players_number);

  if (!isValid) {
    status = constantsList.INVALID;
    winningPlayer = null;

    return { status, winningPlayer };
  }

  const result = checkGameStatus(game);
  status = result.status;
  winningPlayer = result.winningPlayer;

  return { status, winningPlayer };
}

const validGame = (status, players_number) => {
  // Establish current valid movement number
  let validMovementsNumber;
  let isValid = true;

  // Initialize check values
  interface BoardElements {
    name: string;
    quantity: number;
  }

  const boardElements: BoardElements[] = [];

  boardElements.push({ name: 'emptyCell', quantity: 0 });

  for (let i = 0; i < players_number; i++) {
    boardElements.push({ name: 'player' + i, quantity: 0 });
  }

  // Sum quantity from board
  status.forEach((row) => {
    row.forEach((element) => {
      element === -1
        ? boardElements[0].quantity++
        : boardElements[element + 1].quantity++;
    });
  });

  // Start validating from i === 1, since we dont need to validate the empty spaces (-1)
  for (let i = 1; i <= players_number; i++) {
    if (i === 1) {
      validMovementsNumber = boardElements[i].quantity;
    } else {
      isValid = validatePlayerMoves(
        boardElements[i].quantity,
        validMovementsNumber
      );
    }
    if (!isValid) {
      break;
    }
  }

  // Return if its valid or not
  if (isValid) {
    return true;
  }
  return false;
};

const validatePlayerMoves = (playerMovesQuantity, validPlayerMovesQuantity) => {
  if (
    validPlayerMovesQuantity - playerMovesQuantity === 0 ||
    validPlayerMovesQuantity - playerMovesQuantity === 1
  ) {
    return true;
  }
  return false;
};

const checkGameStatus = ({ board, winning_sequence_length }) => {
  let status = null;
  let winningPlayer = null;
  let currentPlayerCheck;

  // Check if a player has won
  fast: for (let i = 0; i < board.size.height; i++) {
    for (let j = 0; j < board.size.width; j++) {
      if (winningPlayer !== null) {
        status = constantsList.WON;
        break fast;
      }
      // Assign the current board square to a variable to compare it
      // If the currentPlayerCheck is -1 then dont compare anywhere
      console.log(board.status[i][j]);

      currentPlayerCheck = board.status[i][j];

      //// Proceed to do the four direction validations;
      // If there is a player who won then finish validating
      if (winningPlayer === null && currentPlayerCheck !== -1) {
        // Right
        winningPlayer = directionValidation(
          i,
          j,
          board,
          winning_sequence_length,
          currentPlayerCheck,
          'RIGHT'
        );
      }

      if (winningPlayer === null && currentPlayerCheck !== -1) {
        // Down
        winningPlayer = directionValidation(
          i,
          j,
          board,
          winning_sequence_length,
          currentPlayerCheck,
          'DOWN'
        );
      }

      if (winningPlayer === null && currentPlayerCheck !== -1) {
        // Down right
        winningPlayer = directionValidation(
          i,
          j,
          board,
          winning_sequence_length,
          currentPlayerCheck,
          'DOWN-RIGHT'
        );
      }
      if (winningPlayer === null && currentPlayerCheck !== -1) {
        // // Down left
        winningPlayer = directionValidation(
          i,
          j,
          board,
          winning_sequence_length,
          currentPlayerCheck,
          'DOWN-LEFT'
        );
      }
    }
  }

  // If there is no winning player, then check if the result is an ongoing status
  if (winningPlayer === null) {
    board.status.forEach((row) => {
      row.forEach((element) => {
        if (element === -1) {
          status = constantsList.ONGOING;
        }
      });
    });
  }

  // If after all the validations, the status is null, then it is a tie
  if (status === null) {
    status = constantsList.TIE;
  }

  return { status, winningPlayer };
};

const directionValidation = (
  i,
  j,
  board,
  winning_sequence_length,
  currentPlayerCheck,
  direction
) => {
  // Assume that current player has won and proceed with validations
  let playerWon = currentPlayerCheck;

  switch (direction) {
    case 'RIGHT':
      if (j + (winning_sequence_length - 1) < board.size.width) {
        for (let k = 1; k < winning_sequence_length; k++) {
          if (board.status[i][j + k] !== currentPlayerCheck) {
            playerWon = null;
            break;
          }
        }
      } else {
        playerWon = null;
      }
      break;
    case 'DOWN':
      if (i + (winning_sequence_length - 1) < board.height) {
        for (let k = 1; k < winning_sequence_length; k++) {
          if (board.status[i + k][j] !== currentPlayerCheck) {
            playerWon = null;
            break;
          }
        }
      } else {
        playerWon = null;
      }

      break;

    case 'DOWN-RIGHT':
      if (
        j + (winning_sequence_length - 1) < board.width &&
        i + (winning_sequence_length - 1) < board.height
      ) {
        for (let k = 1; k < winning_sequence_length; k++) {
          if (board.status[i + k][j + k] !== currentPlayerCheck) {
            playerWon = null;
            break;
          }
        }
      } else {
        playerWon = null;
      }
      break;

    case 'DOWN-LEFT':
      if (
        j + (winning_sequence_length - 1) >= board.size.width &&
        i + (winning_sequence_length - 1) < board.size.height
      ) {
        for (let k = 1; k < winning_sequence_length; k++) {
          if (board.status[i + k][j - k] !== currentPlayerCheck) {
            playerWon = null;
            break;
          }
        }
      } else {
        playerWon = null;
      }
      break;
    default:
      break;
  }

  return playerWon;
};
