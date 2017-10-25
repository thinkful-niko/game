import {
	default as React,
		Component,
} from "react";

import { Redirect } from 'react-router'

import '../../../src/main.css';

class ScoreForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			score: this.props.score,
			redirectToScoreboard: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({name: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		let body = {
			name: this.state.name,
			score: this.state.score
		};

		fetch('https://agile-inlet-43584.herokuapp.com/api/score', {
			method:'POST',
			headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
			body: JSON.stringify(body)
		})
		.then(response => {
				this.setState({redirectToScoreboard: true});
				this.props.resetGame();
		});
	}

	render() {
		if(this.state.redirectToScoreboard) {
			return (
				<Redirect to='/map-game-client/scoreboard'/>
			)
		}
		return(
			<div className='align-center'>
				<h1 className='game-over'>GAME OVER</h1>
				<p className='final-score'>{this.state.score}</p>
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='name' placeholder='ENTER NAME' value={this.state.name} onChange={this.handleChange}/> <br />
					<button type='submit'>SUBMIT SCORE</button>
				</form>
			</div>
		);
	}
}

export default ScoreForm
