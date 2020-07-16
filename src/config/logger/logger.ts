/**
 * This file sets up the winston logger
 * https://www.npmjs.com/package/winston
 */
import {createLogger, format, transports} from 'winston';
import {LogLevels} from "../../project-types";

export const logger = createLogger({
	level: LogLevels.INFO,
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD\'T\'HH:mm:ss.SSS\'Z\''
		}),
		format.errors({stack: true}),
		format.splat(),
		format.json()
	),

	defaultMeta: {service: process.env.PROJECT_NAME, timestamp: new Date().toISOString()},
	transports: [
		new transports.Console({level: 'error'})
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new transports.Console({
		format: format.combine(
			format.colorize(),
			format.simple()
		)
	}));
}
