import { create } from 'zustand';
import { GAMEVIEW } from "../constants/game";

export const useGameStore = create((set) => ({
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

export const useUIStore  = create((set) => ({
    score: 0,
    validAnswers: [],

    setScore: (newScore) => set({ score: newScore }), 
    setValidAnswers: (newValidAnswers) => set({ validAnswers: newValidAnswers})
}));