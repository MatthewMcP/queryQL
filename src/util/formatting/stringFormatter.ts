import { logWarning } from '../logging/logger';

const trimAndCapitalise = (unformattedString: string): string => {
  if (!unformattedString) {
    logWarning('Empty string passed to stringFormater:trimAndCapitalise');
    return '';
  }
  const trimmedString = unformattedString.trim();
  return (
    trimmedString
      .trim()
      .charAt(0)
      .toUpperCase() + trimmedString.slice(1)
  );
};

export { trimAndCapitalise };
