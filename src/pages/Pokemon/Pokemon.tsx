/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useState, ChangeEvent } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';
import { ToastContainer, toast } from 'react-toastify';
import { logError, useQueryString } from '../../util';
import { CardDisplay } from '../../shared/components/index';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TinyUrl = require('tinyurl');

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

  const [countries, setCountries] = useState<any[][]>([]);
  // TODO: Remove the default closer to 'release'
  const { value: uriValue, onSetValue: onSetURIValue } = useQueryString(
    'uri',
    'https://countries.trevorblades.com/'
  );
  const [uri, setURIText] = useState(uriValue);
  const [debouncedURIText] = useDebounce(uri, debounceTime);
  const handleURIChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLTextAreaElement;
    setURIText(target.value);
  };

  const apolloClient = useMemo(() => {
    onSetURIValue(debouncedURIText);
    return new ApolloClient({
      uri: debouncedURIText,
    });
  }, [debouncedURIText]);

  useQuery(gql(debouncedQueryText), {
    client: apolloClient,
    skip: !debouncedQueryText,
    onCompleted: data => {
      if (data && data[Object.keys(data)[0]]) {
        setCountries(data[Object.keys(data)[0]]);
      }
    },
    onError: error => {
      logError(error);
      setCountries([]);
    },
  });

  const hanldeButtonClick = (): any => {
    TinyUrl.shorten(window.location.href, function(
      shortenedUrl: string,
      error: Error
    ) {
      if (error) {
        logError(error);
      }
      navigator.clipboard.writeText(shortenedUrl);
      toast(`${shortenedUrl} Copied to clipboard`);
    });
  };

  // TODO sort this nonsense
  const {
    value: showQuerySectionValue,
    onSetValue: onShowQuerySectionValue,
  } = useQueryString('showQuery', 'true');
  const hanldeQuerySectionButtonClick = (): any => {
    if (showQuerySectionValue === 'true') {
      onShowQuerySectionValue('false');
    } else {
      onShowQuerySectionValue('true');
    }
  };
  const showQuerySectionBool = useMemo(() => {
    return showQuerySectionValue === 'true';
  }, [showQuerySectionValue]);

  return (
    <div className="container mx-auto px-6">
      <ToastContainer autoClose={3000} pauseOnHover />
      <h1 className="flex justify-center text-white mb-8">Pokemon</h1>
      <button className="text-white" onClick={hanldeButtonClick} type="button">
        Copy shortened URL to clipboard
      </button>
      <button
        className="text-white"
        onClick={hanldeQuerySectionButtonClick}
        type="button"
        // eslint-disable-next-line prettier/prettier
      >
        Show/Hide Query section
      </button>
      {showQuerySectionBool && (
        <>
          <label className="container mx-auto px-6">
            Name:
            <input
              type="text"
              name="name"
              onChange={handleURIChange}
              value={uri}
            />
          </label>
          <textarea
            className="box-border h-64 w-64 p-2 border-4 border-gray-400 bg-gray-200 mb-6"
            onChange={handleQueryChange}
            value={query}
          />
        </>
      )}
      <CardDisplay data={countries} />
    </div>
  );
};
export default Pokemon;
