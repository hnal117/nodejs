import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './db/connect';
import user from './routes/user.routes';
import truck from './routes/truck.routes';
import group from './routes/group.routes';
import message from './routes/message.routes';
//import express-validation from 'express-validation';
const server = express();

connectToDb();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(user);
server.use(truck);
server.use(group);
server.use(message);

server.listen(3000, () => {
    console.log('Server started at: 3000');
});

server.use(function(err, req, res, next){
    return res.status(400).json({
        isSuccess:false,
        message: err.message || 'Have Error!',
        error: err.stack || err
    });
  });