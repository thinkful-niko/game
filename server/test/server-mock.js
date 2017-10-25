import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/server';
import '../../app/database';

chai.use(chaiHttp);
export default chai.request(app);
