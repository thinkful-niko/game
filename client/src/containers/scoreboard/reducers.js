// import {
// 	default as React,
// 		Component,
// } from "react";

const initialState = {
	highScores: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_HIGH_SCORES':
			return {
				...state,
				highScores: action.highScores
			}
			default:
				return state
	}
}

export const getHighScores = () => {
	return dispatch => {
		fetch( 'https://agile-inlet-43584.herokuapp.com/api/score/top' )
		.then((response) => {
			return response.json();
		})
		.then((scores) => {
			console.log(scores);
			dispatch(setHighScore(scores));
		});
		// return({type: 'GET_HIGH_SCORES', highScores: highScores})
	}
}

const setHighScore = (highScores) => {
	return ({
		type: 'GET_HIGH_SCORES',
		highScores: highScores
	})
}
