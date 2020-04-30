/* eslint-disable no-console */
// Temporary solution but nice to have it one file -> change it in one file

const log = (logMessage: string): void => {
  console.error(`Log: ${logMessage}`);
};

const logError = (error: Error): void => {
  console.error('Logging error');
  console.error(error);
};

const logWarning = (warning: string): void => {
  console.log(`Warning: ${warning}`);
};

export { log, logError, logWarning };
