import canUseDOM from "can-use-dom";
import store from '../../store'

export const LOCATION = 'adfdsf/LOCATasdION/usethisforoutsidedispatchcalls'

const initialState = {
	theLocation: false,
	maps: [],
	position:{ coords:{ latitude:60, longitude:105} },
	center: { lat:0, lng:0 },
	randomCities: []
}

export default (state = initialState, action) => {

	switch (action.type) {
		case 'SETCENTER':
			return{
				...state,
				center: action.payload
			}
		case 'SET_RANDOM_CITIES':
			return{
				...state,
				randomCities: [action.payload],
				winner: action.winner
			}
		case 'LOADING_GAME':
			console.log('GAME LOADING...');
			return{
				...state,
				loading: false
			}
		case 'CHANGE_GAME_STATE':
			return {
				...state,
				gameStart: false
			}

		default:
			return state
	}
}

export const setLocation = (yo) => {
	return dispatch => {
		dispatch({
			type: LOCATION,
			payload:yo
		})
	}
}

export const setCenter = (position) => {
	let center = {};
	center['lat'] = position.coords.latitude;
	center['lng'] = position.coords.longitude;

	return{
		type:'SETCENTER',
		payload:center
	}
}

const geolocation = (
		canUseDOM && navigator.geolocation ?
		navigator.geolocation :
		({
			getCurrentPosition(success, failure) {
				failure("Your browser doesn't support geolocation.");
			},
		})
	);

	const loadingGame = () => {
		console.log('LOADING...')

		return {
			type: 'LOADING_GAME'
		}
	};

const calculateWinner = (cities, position) =>{
	//let yourLat = position.coords.latitude;
	//let yourLng = position.coords.longitude;
	const yourLat = store.getState().yourMap.center.lat;   //probably a better way
	const yourLng = store.getState().yourMap.center.lng;

	let distance = 99999999;
	let winner = '';

	cities.forEach( (c) => {
		////console.log(c.city)
		////console.log(getDistanceFromLatLonInKm(yourLat, yourLng, c.lat, c.lon))
		const d = getDistanceFromLatLonInKm(yourLat, yourLng, c.lat, c.lon);
		c['distance'] = d;
		if(d < distance){
			distance = d;
		  winner = c.city
		}
	})

	return {
		type: 'SET_RANDOM_CITIES',
		payload: cities,
		winner: winner
	}
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const fetchCity = async (url) => {
	const response = await fetch(url);
	return response.json();
}


export const fetchRandomCities = (position) => {
	return async dispatch  => {
		const url = 'https://agile-inlet-43584.herokuapp.com/api/randomcities';
		let cities = [];
		let city;

		try {
			for (let i = 0; i < 3; i++) {
				city = await fetchCity(url);
				cities.push(city);
			}
			dispatch(calculateWinner(cities, position));
			dispatch(loadingGame());
		} catch (err) {
			console.log('fetch city failed', err);
		}
	}
}

export const changeGameState = () => {
	return dispatch => {
		dispatch({
			type: 'CHANGE_GAME_STATE'
		})
	}
}

export const getFirstMap = () => {
	return dispatch => {
		geolocation.getCurrentPosition((position) => {
			if (this.isUnmounted) {
				return;
			}
			dispatch(setCenter(position))
			dispatch(fetchRandomCities(position))
		})
	}
}
