"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = void 0;
const constants_1 = require("./utils/constants");
function status(game) {
    let status;
    let winningPlayer;
    const isValid = validGame(game.board.status, game.players_number);
    if (!isValid) {
        status = constants_1.constantsList.INVALID;
        winningPlayer = null;
        return { status,
            winningPlayer };
    }
    // Variables
    // game.next_player =  0,
    // game.board = {
    //     size: {
    //         width: 3,
    //         height: 2,
    //     },
    //     status:[
    //         [0,1,1],
    //         [0,0,1]
    //     ],
    // },
    // game.players_number= 2,
    // game.winning_sequence_length= 3,
    // Logica
    // TODO
    return { status,
        winningPlayer };
}
exports.status = status;
const validGame = (status, players_number) => {
    ;
    const boardElements = [];
    boardElements.push({ name: 'emptyCell', quantity: 0 });
    for (let i = 0; i < players_number; i++) {
        boardElements.push({ name: 'player' + i, quantity: 0 });
    }
    // Sum quantity from board
    console.log(status);
    return true || false;
};
//# sourceMappingURL=app.js.map