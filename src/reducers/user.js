import * as UserActionTypes from '../actiontypes/user';

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00','#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]
const initialState = {
  color_memory: defaultColors,
  selected_color: 'rgba(118,0,255,0.2)',
}

export default function User(state=initialState, action) {

  switch(action.type){
    case UserActionTypes.CHANGE_COLOR: {
      // IMMUTABLY CHANGE OBJECT making default of red
      const update = {...state, selected_color: action.color}
      console.log('UPDATE WAS CALLED', update);
      return update;
	 	}
    case UserActionTypes.ADD_LAYER: {
      // IMMUTABLY CHANGE OBJECT making default of red
      const update = {
        ...state,
        layers: [...state.layers, action.layer],
      }
      console.log('UPDATE WAS CALLED', update);
      return update;
	 	}

    default:
      console.log('default reducer called');
      return state;
  }
}
