import express from 'express';
import routes from './routes';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1', routes);

app.listen(8080);