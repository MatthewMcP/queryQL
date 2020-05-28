// https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f

import qs from 'query-string';
import { Base64 } from 'js-base64';

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
  // eslint-disable-next-line no-extra-parens
  const stringVal = values[key] ? (values[key] as string) : '';
  return Base64.decode(stringVal);
};

const setQueryStringValue = (
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  queryString = window.location.search
): void => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({
    ...values,
    [key]: Base64.encode(value),
  });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export { getQueryStringValue, setQueryStringValue };
