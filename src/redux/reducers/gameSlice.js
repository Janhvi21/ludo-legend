import { createSlice } from "@reduxjs/toolkit";
import { initialState, player1InitialState, player2InitialState, player3InitialState, player4InitialState, scoreboard } from "./initialState";
import asyncStorage from "../storage";

export const gameSlice = createSlice({
        name: 'game',
        initialState: initialState,
        reducers: {
                resetGame: () => initialState,
                assignPiles: (state) => {
                        if (state.noOfPlayer < 4) {
                                state.player4 = [];
                        }
                        if (state.noOfPlayer < 3) {
                                state.player2 = [];
                        }
                },
                setScoreBoard: () => {
                        asyncStorage.setItem('SCOREBOARD', JSON.stringify(scoreboard));
                },
                annouceWinner: (state, action) => {
                        state.winner = action.payload;
                },
                setNoOfPlayers: (state, action) => {
                        state.noOfPlayer = action.payload;
                },
                updateFireworks: (state, action) => {
                        state.fireworks = action.payload;
                },
                updateDiceNo: (state, action) => {
                        state.diceNo = action.payload.diceNo;
                        state.isDiceRolled = true;
                },
                enablePileSelection: (state, action) => {
                        state.touchDiceBlock = true;
                        state.pileSelectionPlayer = action.payload.playerNo;
                },
                updatePlayerChance: (state, action) => {
                        let chancePlayer;
                        if (action.payload.move === 'true') {
                                chancePlayer = state.noOfPlayer == 4 ? action.payload.chancePlayer + 1 : action.payload.chancePlayer + 2;
                                if (chancePlayer > 4) {
                                        chancePlayer = 1;
                                }
                        } else {
                                chancePlayer = action.payload.chancePlayer
                        }
                        state.chancePlayer = chancePlayer;

                        state.touchDiceBlock = false;
                        state.isDiceRolled = false;
                },
                enableCellSelection: (state, action) => {
                        state.touchDiceBlock = true;
                        state.cellSelectionPlayer = action.payload.playerNo;
                },
                unfreezeDice: (state, action) => {
                        state.touchDiceBlock = false;
                        state.isDiceRolled = false;
                },
                disableTouch: state => {
                        state.touchDiceBlock = true;
                        state.cellSelectionPlayer = -1;
                        state.pileSelectionPlayer = -1;
                },
                updatePlayerPieceValue: (state, action) => {
                        const { playerNo, pieceId, pos, travelCount } = action.payload;
                        const playerPieces = state[playerNo];
                        const piece = playerPieces.find(p => p.id === pieceId);
                        state.pileSelectionPlayer = -1;
                        if (piece) {
                                piece.pos = pos;
                                piece.travelCount = travelCount;
                                const currentPositionIndex = state.currentPositions.findIndex(
                                        p => p.id === pieceId,
                                );
                                if (pos == 0) {
                                        if (currentPositionIndex !== -1) {
                                                state.currentPositions.splice(currentPositionIndex, 1);
                                        }
                                } else {
                                        if (currentPositionIndex !== -1) {
                                                state.currentPositions[currentPositionIndex] = {
                                                        id: pieceId,
                                                        pos,
                                                };
                                        } else {
                                                state.currentPositions.push({ id: pieceId, pos });
                                        }
                                }
                        }
                },
        },
});

export const { resetGame, setNoOfPlayers, assignPiles, setScoreBoard, disableTouch, updatePlayerPieceValue, unfreezeDice, enableCellSelection, enablePileSelection, updatePlayerChance, updateDiceNo, annouceWinner, updateFireworks } = gameSlice.actions;

export default gameSlice.reducer;