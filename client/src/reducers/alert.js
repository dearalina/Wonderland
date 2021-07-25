import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

// Takes in state by default, action
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      // Remove a specific alert by its id
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
