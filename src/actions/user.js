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
export const changeBrushSize = (width, height) => {
  return {
    type: UserActionTypes.CHANGE_BRUSH_SIZE,
    width,
    height
  };
};
export const resetCanvas = (width, height) => {
  return {
    type: UserActionTypes.CHANGE_BRUSH_SIZE,
    width,
    height
  };
};
