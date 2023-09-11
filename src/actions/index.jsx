export const addToMyBooks = (id) => {
  return {
    type: "ADD_TO_MYBOOKS",
    payload: id,
  };
};

export const removeFromMyBooks = (id) => {
  return {
    type: "REMOVE_FROM_MYBOOKS",
    payload: id,
  };
};

