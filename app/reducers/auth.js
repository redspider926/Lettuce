import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  getStarted: false,
  phoneNumber: '',
  confirmation: null,
  user: {},
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_STARTED:
      return {
        ...state,
        getStarted: true,
      };
    case actionTypes.SET_CONFIRMATION:
      return {
        ...state,
        confirmation: action.payload,
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case actionTypes.REGISTER:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default auth;
