import { transports, format } from 'winston';

export const getWinstonConfig = () => {
  const isDebugMode = process.env.DEBUG === 'true';
  const consoleFormat = format.combine(
    format.ms(),
    format.timestamp(),
    format.json(),
  );

  const now = new Date();
  const date = new Intl.DateTimeFormat('ru-RU').format(now);

  return {
    level: isDebugMode ? 'debug' : 'info',
    transports: [
      new transports.Console({ format: consoleFormat }),
      new transports.File({
        level: 'info',
        dirname: 'logs',
        filename: `${date}.json`,
        maxFiles: 5,
        format: consoleFormat,
      }),
    ],
  };
};
