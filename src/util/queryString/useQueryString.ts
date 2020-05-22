// https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f

import { useState, useCallback } from 'react';
import { getQueryStringValue, setQueryStringValue } from './queryStringUtil';

type useQueryStringProps = {
  value: string;
  onSetValue: any;
};

const useQueryString = (
  key: string,
  initialValue?: any
): useQueryStringProps => {
  const [value, setValue] = useState(getQueryStringValue(key) || initialValue);
  const onSetValue = useCallback(
    newValue => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key]
  );

  return { value, onSetValue };
};

export { useQueryString };
