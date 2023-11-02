import express from 'express';

import { SendMessages, DeleteMessages } from './Controllers/Messages';

const routes = express.Router();

routes.post('/sendMessage', SendMessages);
routes.delete('/deleteMessages', DeleteMessages);

module.exports = routes;