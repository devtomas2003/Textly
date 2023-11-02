import express from 'express';

import { GetMessages } from './Controllers/Messages';

const routes = express.Router();

routes.get('/messages', GetMessages);

module.exports = routes;