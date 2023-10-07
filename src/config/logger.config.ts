import 'winston-daily-rotate-file';
import { transports, format } from 'winston';

export const getWinstonConfig = () => {
  const isDebugMode = process.env.DEBUG === 'true';
  const consoleFormat = format.combine(
    format.ms(),
    format.timestamp(),
    format.json(),
    format.colorize(),
    format.prettyPrint(),
  );

  const options = {
    dirname: 'logs',
    datePattern: 'DD-MM-YYYY',
    maxFiles: '10d',
    format: consoleFormat,
  };

  return {
    level: isDebugMode ? 'debug' : 'info',
    transports: [
      new transports.Console({ format: consoleFormat }),
      new transports.DailyRotateFile({
        level: 'error',
        filename: '%DATE%-error.log',
        ...options,
      }),
      new transports.DailyRotateFile({
        level: 'info',
        filename: '%DATE%-info.log',
        ...options,
      }),
    ],
  };
};
