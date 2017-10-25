const City = require('../../models/City');

module.exports = (app) => {

  app.get('/api/cities', (req, res, next) => {
     City.find()
      .exec()
      .then((cities) => {
      	let citiesArr = [];
      	for(let i = 0; i < 2; i++) {
      		const random = Math.floor(Math.random() * cities.length);
      		citiesArr.push(cities[random]);
      	}
      	res.json(citiesArr);
      })
      .catch((err) => next(err));
  });

  app.get('/api/randomcities', (req, res, next) => {
  	City.count()
  		.exec()
  		.then((count) => {
  			const random = Math.floor(Math.random() * count);
  			City.findOne().skip(random)
  				.exec()
  				.then(result => {
  					res.json(result);
  				})
  				.catch((err) => next(err));
  		})
  		.catch((err) => next(err));
  });
};
