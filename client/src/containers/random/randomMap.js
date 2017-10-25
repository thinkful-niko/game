import store from '../../store';

const initialState = {
	count: 0,
	randomLocations: [],
	winner: false,
	score: 0 ,
	strikes: 0,
	endGame: false
}

export default (state = initialState, action) => {
	switch (action.type) {

		case 'SCORE':
			return {
				...state,
 	  		 	score: state.score + action.payload,
 	  		 	strikes: state.strikes + action.strike,
 	  		 	endGame: action.endGame
			}

			case 'RESET_GAME':
				return {
					...state,
					score: 0,
					strikes: 0,
					endGame: false
				}

		default:
			return state
	}
}

export const resetGame = () => {
	return dispatch => {
		dispatch({
			type: 'RESET_GAME'
		})
	}
}


export const checkWinner = (winner) => {
	let score;
	let strike = 0;
	let gameOver = false;
	winner ? score = 100 : (score = 0, 	strike++);
	if(store.getState().randomMap.strikes + strike >= 3) {
		gameOver = true;
	}

	return dispatch => {
		dispatch({
			type: 'SCORE',
			payload: score,
			strike: strike,
			endGame: gameOver
		})
	}
}
