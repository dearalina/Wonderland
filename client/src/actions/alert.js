import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert =
  (msg, alertType, timeout = 3000) =>
  dispatch => {
    // Get random string from uuid
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    // Dispatch REMOVE_ALERT with a payload after 3s
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
