import * as express from 'express';
import {apiRouter} from './api';

export const router = express.Router();

router.use('/api', apiRouter);
// router.use('/api/person', personRouter);
