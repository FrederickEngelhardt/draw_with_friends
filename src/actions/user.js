import * as UserActionTypes from '../actiontypes/user';

export const changeColor = color => {
  return {
    type: UserActionTypes.CHANGE_COLOR,
    color
  };
};
export const addLayer = layer => {
  return {
    type: UserActionTypes.ADD_LAYER,
    layer
  };
};
