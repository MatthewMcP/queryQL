const trimAndCapitalise = (unformattedString: string): string => {
  // TODO Error handling
  const trimmedString = unformattedString.trim();
  return (
    trimmedString
      .trim()
      .charAt(0)
      .toUpperCase() + trimmedString.slice(1)
  );
};

export { trimAndCapitalise };
