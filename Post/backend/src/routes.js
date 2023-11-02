import express from 'express';

import { SendMessages } from './Controllers/Messages';

const routes = express.Router();

routes.post('/sendMessage', SendMessages);

module.exports = routes;