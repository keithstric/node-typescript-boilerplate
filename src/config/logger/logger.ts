/**
 * This file sets up the winston logger
 * https://www.npmjs.com/package/winston
 */
import {createLogger, format, transports} from 'winston';
import {LogLevels} from "../../project-types";

export const logger = createLogger({
	defaultMeta: {service: process.env.PROJECT_NAME, timestamp: new Date().toISOString()},
	level: LogLevels.INFO,
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD\'T\'HH:mm:ss.SSS\'Z\''
		}),
		format.errors({stack: true}),
		format.splat(),
		format.json()
	),
	transports: [
		new transports.Console({level: 'error'})
	]
});

// For development only. Pipe all logging events (with exception of http) to the console
// this may and will produce double error messages going to the console
// one for this transport and one for the console transport defined in the initial creation
if (process.env.NODE_ENV !== 'production') {
	logger.add(new transports.Console({
		format: format.combine(
			format.colorize(),
			format.simple()
		)
	}));
}
