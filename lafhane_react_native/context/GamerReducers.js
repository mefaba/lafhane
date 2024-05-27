export const badgeReducer = (state, action) => {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case "SHOW_TRUE_ANSWER":
      return {
        ...state,
        view: "visible",
        answer: action.payload,
        answerStatus: true,
      };
    case "SHOW_FALSE_ANSWER":
      return { ...state, answer: action.payload, answerStatus: false };
    case "HIDE_BADGE":
      return { ...state, view: "hidden" };
    case "SHOW_BADGE":
      return {
        ...state,
        view: "visible",
      };
    case "RESET":
      return {
        view: "hidden", //hidden vs visible
        point: undefined,
        answer: "",
        answerStatus: false,
      };
    default:
      throw new Error();
  }
};
