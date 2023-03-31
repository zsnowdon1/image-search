import express from 'express';
import mariadb from 'mariadb';
import bodyParser from 'body-parser';
import cors from 'cors';

import photoRoutes from './routes/photo-routes.js'

const app = express();

export const dbPool = mariadb.createPool({
    host: 'mariadb',
    port: 3306, 
    user:'root', 
    password: 'password'
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/photo', photoRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT);