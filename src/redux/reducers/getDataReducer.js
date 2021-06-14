function Reducer(state = {}, action) {
  switch (action.type) {
    case "getData":
      state = action.data;
      return state;
    default:
      return state;
  }
}

export default Reducer;
