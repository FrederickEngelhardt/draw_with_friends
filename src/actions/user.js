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
export const settingSelector = (activeSetting) => {
  console.log("CHANGED SETTINGS TO", activeSetting);
  return {
    type: UserActionTypes.UPDATE_SELECTED_SETTINGS,
    activeSetting
  };
};
export const toggleDrawingTools = (toggle) => {
  console.log("CHANGED SETTINGS TO", toggle);
  return {
    type: UserActionTypes.TOGGLE_DRAWING_TOOLS,
    toggle
  };
};
export const toggleVR = (toggle) => {
  console.log("CHANGED SETTINGS TO", toggle);
  return {
    type: UserActionTypes.TOGGLE_VR,
    toggle
  };
};
export const addSession = (sessionID) => {
  console.log("A user created a new session", sessionID);
  return {
    type: UserActionTypes.ADD_SESSION,
    sessionID
  };
};
export const updateSelectedSocketSession = (sessionID) => {
  console.log("A user created a new session", sessionID);
  return {
    type: UserActionTypes.UPDATE_SELECTED_SOCKET_SESSION,
    sessionID
  };
};
