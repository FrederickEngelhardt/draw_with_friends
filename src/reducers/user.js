import * as UserActionTypes from '../actiontypes/user';

const initialState = {
  x: undefined,
  y: undefined,
  rectangle_width: 20,
  rectangle_height: 20,
  canvasWidth: 500,
  canvasHeight: 500,
  alpha: 0.2,
  color_memory: defaultColors,
  selected_color: 'rgba(118,0,255,0.2)',
  clickDown: false
}

export default function User(state=initialState, action) {	

	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth()+1;
	let year = date.getFullYear();

  switch(action.type){
    case UserActionTypes.ADD_PLAYER: {
			const addUserList = [...state.players,   {
          name: action.name,
          score: 0,
          created: `${month}/${day}/${year}`
      }];
      return {
        ...state,
				players: addUserList
		 	};
	 	}

    case UserActionTypes.REMOVE_PLAYER: {
			const removeUserList = [
				...state.players.slice(0, action.index),
				...state.players.slice(action.index + 1)
			];
      return {
				...state,
				players: removeUserList
			};
		}

    case PlayerActionTypes.UPDATE_PLAYER_SCORE: {
			const updatePlayerList = state.players.map((player, index) => {
        if(index === action.index){
          return {
            ...player,
             score: player.score + action.score,
             updated: `${month}/${day}/${year}`
           };
        }
        return player;
      });
			return {
				...state,
				players: updatePlayerList
			};
		}

	  case PlayerActionTypes.SELECT_PLAYER:
		  return {
				...state,
				selectedPlayerIndex: action.index
			};

    default:
      return state;
  }
}
