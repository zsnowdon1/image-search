import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import photoRoutes from './routes/photo-routes.js';
const app = express();
// const db = mariadb.createConnection({
//     host: 'localhost',
//     user: 'user',
//     password: 'password',
//     database: 'image_search_database'
// })
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/photo', photoRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`EXAMPLE APP running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map