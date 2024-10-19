export const taskReducer = (state, action) => {
  switch (action.type) {
    case "REWRITE_DATA":
      return action.payload;
    case "ADD_TASK":
      return [
        { ...action.payload, completed: false, id: Date.now() },
        ...state,
      ];

    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.payload.id);

    case "UPDATE_TASK":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      );

    case "TOGGLE_COMPLETE":
      const element = state.find((t) => t.id === action.payload.id);
      element["completed"] = !element["completed"];

      const newArray = state.filter((t) => t.id !== action.payload.id);
      return element.completed
        ? [...newArray, element]
        : [element, ...newArray];

    default:
      break;
  }
};
