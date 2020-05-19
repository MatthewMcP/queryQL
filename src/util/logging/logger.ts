/* eslint-disable no-console */
// Temporary solution but it's nicer to have it one file so I can change in one location

const log = (logMessage: string): void => {
  console.error(`Log: ${logMessage}`);
};

const logError = (error: Error): void => {
  console.error('Logging error');
  console.error(error);
};

const logWarning = (warning: string): void => {
  console.warn(`Warning: ${warning}`);
};

export { log, logError, logWarning };
