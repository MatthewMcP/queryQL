/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
import React, { useState, ChangeEvent } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { logError } from '../../util';
import { Country } from './Types';
import { Card } from '../../shared/components/index';

const Pokemon = (): JSX.Element => {
  const defaultQueryString = `{
    countries {
      name
      native
      emoji
      currency
      languages {
        name
      }
    }
  }`;

  const [query, setQuery] = useState<string>(defaultQueryString);
  const [countries, setCountries] = useState<Country[][]>([]);

  const handleQueryChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLTextAreaElement;
    setQuery(target.value);
  };

  useQuery(gql(query), {
    onCompleted: data => {
      if (data && data.countries) setCountries(data.countries);
    },
    onError: error => {
      logError(error);
    },
  });

  return (
    <div>
      <div>Pokemon</div>
      <br />
      <textarea value={query} onChange={handleQueryChange} />
      <br />
      <Card data={countries} />
    </div>
  );
};
export default Pokemon;
