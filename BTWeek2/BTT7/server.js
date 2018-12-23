import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './db/connect';
import user from './routes/user.routes';
import truck from './routes/truck.routes';

const server = express();

connectToDb();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(user);
server.use(truck);

server.listen(3000, () => {
    console.log('Server started at: 3000');
});

