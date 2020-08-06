
import {format, LogEntry} from 'winston';
import Transport from 'winston-transport';
import {IDbQuery, LogLevels} from '../../project-types';

export interface CustomTransportConfig {
	logsCollection?: string;
	errorLogsCollection?: string;
	requestLogsCollection?: string;
	level?: LogLevels;
	format?: any;
	handleExceptions?: boolean;
}

export class CustomTransport extends Transport {
	options: CustomTransportConfig = {
		logsCollection: 'application-logs',
		errorLogsCollection: 'error-logs',
		requestLogsCollection: 'request-logs',
		level: LogLevels.INFO,
		format: format.combine(
			format.timestamp({
				format: 'YYYY-MM-DD\'T\'HH:mm:ss.SSS\'Z\''
			}),
			format.splat(),
			format.json()
		),
		handleExceptions: true
	}

	constructor(options: CustomTransportConfig) {
		super(options);
		this.options = {
			...this.options,
			...options
		};
	}

	get name(): string {
		return `${process.env.PROJECT_NAME}CustomTransport`;
	}

	async log(logEntry: LogEntry, next: () => void) {
		setImmediate(() => {
			this.emit('logged', logEntry);
		});
		try {
			if (logEntry.level !== LogLevels.HTTP && this.level === LogLevels.HTTP) {
				// do nothing, prevents duplicate entries
			}else {
				// Add your DB logic here
			}
		} catch(err) {
			console.error(`Error logging to MongoDb: ${err.message}`);
		} finally {
			next();
		}
	}

	query(options: IDbQuery) {}
}
