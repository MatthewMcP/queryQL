// https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f

import qs from 'query-string';
import { Base64 } from 'js-base64';
import pako from 'pako';

const setQueryStringWithoutPageReload = (queryStringValue: string): void => {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryStringValue}`;
  window.history.pushState({ path: newurl }, '', newurl);
};

const getQueryStringValue = (
  key: string,
  queryString = window.location.search
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const values = qs.parse(queryString);
  if (values[key]) {
    const stringValue = values[key] as string;
    const unencodedValue = Base64.decode(stringValue);
    const decompressedVal = pako.inflate(unencodedValue, { to: 'string' });
    return decompressedVal;
  }
  return '';
};

const setQueryStringValue = (
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  queryString = window.location.search
): void => {
  const qsValues = qs.parse(queryString);
  const compressedValue = pako.deflate(value, { to: 'string' });
  const encodedAndCompressedValue = Base64.encode(compressedValue);

  const newQsValue = qs.stringify({
    ...qsValues,
    [key]: encodedAndCompressedValue,
  });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export { getQueryStringValue, setQueryStringValue };
