import {
	default as React,
		Component,
} from "react";

import { getHighScores } from './reducers';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../../src/main.css';

export class ScoreBoard extends Component {
	// get top scores from api and then render.
	componentDidMount() {
		this.props.getHighScores();
	}

	render() {
		let scores = [];
		const colors = ['first','second','third','fourth','fifth','sixth','seventh','eight','ninth','tenth', 'your-score'];
		// let rank = 1;
		this.props.highScores.map((record, rank) => {
			if (rank === 10) {
				scores.push(
					<div className='record last-score' key={rank}>
						<div className={'rank ' + colors[rank]}>Most Recent</div>
						<div className={'name ' + colors[rank]}>{record.name}</div>
						<div className={'scoreboard-score ' + colors[rank]}>{record.score}</div>
					</div>);
			} else {
				scores.push(
					<div className='record' key={rank}>
						<div className={'rank ' + colors[rank]}>{rank+1}</div>
						<div className={'name ' + colors[rank]}>{record.name}</div>
						<div className={'scoreboard-score ' + colors[rank]}>{record.score}</div>
					</div>);
			}
		});

		return(
			<div className='align-center scoreboard'>
				<div className='record'>
					<div className='rank header'>RANK</div>
					<div className='name header'>NAME</div>
					<div className='scoreboard-score header'>SCORE</div>
				</div>
				{scores}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return({
		highScores: state.scoreBoard.highScores
	})
}

const mapDispatchToProps = dispatch => bindActionCreators({
	getHighScores
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard)
