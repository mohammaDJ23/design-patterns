import { Logger } from './logger';

const logger1 = Logger.getInstance();
logger1.log('Application started');

const logger2 = Logger.getInstance();
logger2.log('User logged in');

console.log(logger1 === logger2);

console.log(logger1.getLogs());
