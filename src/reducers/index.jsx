const initialState = {
  mybooks: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_MYBOOKS":
      return {
        ...state,
        mybooks: [...state.mybooks, action.payload],
      };
    case "REMOVE_FROM_MYBOOKS":
      return {
        ...state,
        mybooks: state.mybooks.filter((id) => id !== action.payload), //指定の本を削除した配列にする
      };
    default:
      return state;
  }
};

export default rootReducer;
