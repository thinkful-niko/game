import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	checkWinner,
} from './randomMap'

import '../../../src/main.css';

import { increment } from '../../modules/counter'
import { fetchRandomCities } from '../map/reducers'

import {
	default as React,
	Component,
} from "react";

import {
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

import 'whatwg-fetch';

const containerStyle = {
	display: 'block',
	padding: '10px 0',
}

const mapElementStyle = {
	height: `250px`,
	width: `250px`
}

// const geolocation = (
// 		canUseDOM && navigator.geolocation ?
// 		navigator.geolocation :
// 		({
// 			getCurrentPosition(success, failure) {
// 				failure(`Your browser doesn't support geolocation.`);
// 			},
// 		})
// 		);

const RandomCity = withGoogleMap(props => {

	return (
		<div>
			<GoogleMap defaultZoom={12} center={props.center}>
				<Marker position={props.center} title={props.name} />
			</GoogleMap>
		</div>
	)
});

class RandomCityMap extends Component {

	isUnmounted = false;

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	render() {
		return (
			<div>
				<RandomCity
					containerElement={
						<div style={containerStyle} />
					}
					mapElement={
						<div style={mapElementStyle} />
					}
					center={this.props.center}
					name={decodeURIComponent(this.props.name)}
					onClick={this.props.increment}
				/>
				<button className='btn' onClick={() => { this.props.checkWinner(this.props.winner); this.props.fetchRandomCities(); }}>Is {decodeURIComponent(this.props.name)} the closest?</button>
			</div>
		);
	}
}

const mapStateToProps = state => {

	return({
	 count: state.counter.count,
	 theLocation: state.randomMap.theLocation,
	 checkWinner: state.randomMap.winner,
	})
}

const mapDispatchToProps = dispatch => bindActionCreators({
	increment,
	checkWinner,
	fetchRandomCities,
	changePage: () => push('/about-us')
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RandomCityMap)
