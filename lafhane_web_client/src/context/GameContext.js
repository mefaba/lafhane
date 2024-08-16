import { create } from 'zustand';
import { GAMEVIEW } from "../constants/game";

const useGameStore = create((set) => ({
  puzzleLetters: [],
  puzzleAnswerList: [],
  gameView: undefined,
  remainingTime: 0,
  username: "",
  scoresGame: [],
  scoresTotal: [],
  isconnected: false,

  setPuzzleLetters: (letters) => set({ puzzleLetters: letters }),
  setPuzzleAnswerList: (answers) => set({ puzzleAnswerList: answers }),
  setGameView: (view) => set({ gameView: view }),
  setRemainingTime: (time) => set({ remainingTime: time }),
  setUsername: (name) => set({ username: name }),
  setScoresGame: (scores) => set({ scoresGame: scores }),
  setScoresTotal: (scores) => set({ scoresTotal: scores }),
  setIsconnected: (connected) => set({ isconnected: connected }),
}));


export default useGameStore;