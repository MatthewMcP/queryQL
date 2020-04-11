interface Language {
  code: string;
  name: string;
}

interface Country {
  name: string;
  native: string;
  emoji: unknown;
  currency: string;
  languages: Language[];
}

// eslint-disable-next-line prettier/prettier
export type { Country, Language };
