import { createSlice } from "@reduxjs/toolkit";
import { initialState, player1InitialState, player2InitialState, player3InitialState, player4InitialState, scoreboard } from "./initialState";
import asyncStorage from "../storage";
import { Alert } from "react-native";

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
                updateScoreBoard: (state, action) => {
                        (async () => {
                                const scoreboard = JSON.parse(await asyncStorage.getItem('SCOREBOARD'));
                                const existingPlayer = scoreboard.findIndex(item => item.name === action.payload);
                                if (existingPlayer !== -1) {
                                        scoreboard[existingPlayer].wins += 1;
                                }
                                else {
                                        const newEntry = { id: scoreboard.length + 1, name: action.payload, wins: 1 }
                                        scoreboard.push(newEntry);
                                }
                                await asyncStorage.setItem('SCOREBOARD', JSON.stringify(scoreboard));
                        })();
                },
                setPlayer1Info: (state, action) => {
                        state.playerInfo.player1.name = action.payload;
                },
                setPlayer2Info: (state, action) => {
                        state.playerInfo.player2.name = action.payload;
                },
                setPlayer3Info: (state, action) => {
                        state.playerInfo.player3.name = action.payload;
                },
                setPlayer4Info: (state, action) => {
                        state.playerInfo.player4.name = action.payload;
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

export const { resetGame, initializePlayers, setNoOfPlayers, updateScoreBoard, setPlayer1Info, setPlayer2Info, setPlayer3Info, setPlayer4Info, assignPiles, disableTouch, updatePlayerPieceValue, unfreezeDice, enableCellSelection, enablePileSelection, updatePlayerChance, updateDiceNo, annouceWinner, updateFireworks } = gameSlice.actions;

export default gameSlice.reducer;