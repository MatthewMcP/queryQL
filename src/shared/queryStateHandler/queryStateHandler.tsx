import React from 'react';
import { logError } from '../../util';

// TODO: Would this be better in a hook?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queryStateHandler = (isLoading: boolean, error: Error): any => {
  if (isLoading) return <div>This is a loading placeholder</div>;

  if (error) {
    logError(error);
    return <div>This is an error placeholder</div>;
  }

  // eslint-disable-next-line consistent-return, no-useless-return
  return;
};

export { queryStateHandler };
