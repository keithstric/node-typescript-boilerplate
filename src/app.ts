import {requestLogger} from './config/logger/request-logger-middleware';
import swaggerDocs from './config/swaggerDoc';
import express, {Request, Response, Application} from 'express';
import flash from 'express-flash';
import {logger} from './config/logger/logger';
import * as dotenv from 'dotenv';
import {router} from './routes';

dotenv.config();
/**
 * Setup the application
 */
const app: Application = express();
const port = process.env.NODE_ENV === 'development' ? parseInt(process.env.WEB_LOCAL_PORT) : parseInt(process.env.WEB_PORT);
/* If using docker, remove the above port, and use this instead */
// const port = process.env.WEB_PORT

/**
 * express middleware
 */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(flash());

/**
 * Log all requests (LogLevel = debug)
 */
app.use(requestLogger)

/**
 * express middleware to handle unhandled errors
 */
app.use((err: Error, req: Request, res: Response, next: any) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
	logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
	res.status(500).send(err);
	next();
});

/**
 * Initialize all the routes
 */
app.use('/', router);

/**
 * initialize Swagger. Must be initialized last to account for all routes
 */
swaggerDocs(app);

/**
 * Start the listener
 */
app.listen(port, () => {
	let baseUrl = `http://localhost:${port}`;
	logger.info(`node-typescript-boilerplate listening on:\n port: ${port}\n Locally at: ${baseUrl}\n`);
});
