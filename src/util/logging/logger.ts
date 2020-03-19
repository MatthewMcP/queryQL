/* eslint-disable no-console */
// Temporary solution but better to change it in one place
const logError = (error: Error): void => {
  console.error('Logging error');
  console.error(error);
};

export { logError };
