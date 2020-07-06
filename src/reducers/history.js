const initialState = {
  withdraws: [],
  deposits: [],
};

export default (state = initialState, { type, ...action }) => {
  switch (type) {
    case "SetWithdrawls":
      return { ...state, withdraws: action.payload };
    case "SetDeposits":
      return { ...state, deposits: action.payload };
    default:
      return state;
  }
};
