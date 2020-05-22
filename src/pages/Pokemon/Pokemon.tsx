/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, ChangeEvent } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';
import { logError, useQueryString } from '../../util';
import { Country } from './Types';
import { Card } from '../../shared/components/index';

const Pokemon = (): JSX.Element => {
  const defaultQueryString = `{
    countries {
      name
      native
      capital
      phone
      emoji
      currency
      languages {
        name
      }
    }
  }`;

  // TODO: Remove the default closer to 'release'
  const { value, onSetValue } = useQueryString('state', defaultQueryString);
  const [query, setQueryText] = useState(value);
  const debounceTime = 1000;
  const [debouncedQueryText] = useDebounce(query, debounceTime);

  useEffect(() => {
    onSetValue(debouncedQueryText);
  }, [debouncedQueryText]);

  const handleQueryChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLTextAreaElement;
    setQueryText(target.value);
  };

  const [countries, setCountries] = useState<Country[][]>([]);
  useQuery(gql(debouncedQueryText), {
    skip: !debouncedQueryText,
    onCompleted: data => {
      if (data && data.countries) setCountries(data.countries);
    },
    onError: error => {
      logError(error);
      setCountries([]);
    },
  });

  return (
    <div className="container mx-auto px-6">
      <h1 className="flex justify-center text-white mb-8">Pokemon</h1>
      <textarea
        className="box-border h-64 w-64 p-2 border-4 border-gray-400 bg-gray-200 mb-6"
        value={query}
        onChange={handleQueryChange}
      />
      <Card data={countries} />
    </div>
  );
};
export default Pokemon;
