import winston, { format } from 'winston';
import path from 'path';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.splat(),
    format.simple(),
  ),
  transports: [
    new winston.transports.File({ dirname: path.join(__dirname, '../logs'), filename: 'error.log', level: 'error' }),
    new winston.transports.File({ dirname: path.join(__dirname, '../logs'), filename: 'combined.log' }),
  ],
});

Reflect.defineProperty(logger.stream, 'write', {
  value: (str) => {
    logger.info(str);
  },
  writable: false,
  enumerable: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
