// https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f

import qs from 'query-string';

const setQueryStringWithoutPageReload = (queryStringValue: string): void => {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryStringValue}`;
  window.history.pushState({ path: newurl }, '', newurl);
};

const getQueryStringValue = (
  key: string,
  queryString = window.location.search
): any => {
  const values = qs.parse(queryString);
  return values[key];
};

const setQueryStringValue = (
  key: string,
  value: any,
  queryString = window.location.search
): void => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({
    ...values,
    [key]: value,
  });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export { getQueryStringValue, setQueryStringValue };
