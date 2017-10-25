import {
	default as React,
		Component,
} from "react";

import AnimatedNumber from 'react-animated-number';

import '../../../src/main.css';

class GameStatus extends Component {

	render() {
		// console.log(this.state);
		return (
			<div className='align-center'>
				<div className='status-container'>
					<AnimatedNumber component="text" value={this.props.score} className='score'
						style={{
								transition: '.3s ease-in-out',
								transitionProperty:	'color'
						}}
						frameStyle={perc => (
								perc === 100 || !perc ? {} : {color: '#00ff00'}
						)}
						stepPrecision={0}
						duration={1500}
						formatValue={n => `${n}`} />  <br />
						<div className='status-header'>Score</div>
				</div>
				{/*}<h2 className='score'>Your Score: {this.state.score}</h2>*/}
				<div className='status-container'>
					<div className='strikes'>{this.props.strikes}</div><br />
					<div className='status-header'>Strikes</div>
				</div>
			</div>
		)
	}
}

export default GameStatus;
