import React, { useEffect, useMemo, useState, ChangeEvent } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';
import { ToastContainer, toast } from 'react-toastify';
import { logError, useQueryString } from '../../util';
import { CardDisplay, TableDisplay } from '../../shared/components/index';
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
  const { value: queryValue, onSetValue: onSetQueryValue } = useQueryString(
    'query',
    defaultQueryString
  );
  const [queryText, setQueryText] = useState(queryValue);
  const debounceTime = 1000;
  const [debouncedQueryText] = useDebounce(queryText, debounceTime);
  const handleQueryChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLTextAreaElement;
    setQueryText(target.value);
  };
  useEffect(() => {
    onSetQueryValue(debouncedQueryText);
  }, [debouncedQueryText]);

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

  const [queryResultData, setQueryResultData] = useState<unknown[][]>([]);
  const { error: gqlError, loading } = useQuery(gql(debouncedQueryText), {
    client: apolloClient,
    skip: !debouncedQueryText,
    onCompleted: data => {
      if (data && data[Object.keys(data)[0]]) {
        setQueryResultData(data[Object.keys(data)[0]]);
      }
    },
    onError: error => {
      logError(error);
      setQueryResultData([]);
    },
  });

  const handleTinyURLButtonClick = (): void => {
    TinyUrl.shorten(
      window.location.href,
      (shortenedUrl: string, error: Error) => {
        if (error) {
          logError(error);
        }
        navigator.clipboard.writeText(shortenedUrl);
        toast(`${shortenedUrl} Copied to clipboard`);
      }
    );
  };

  const {
    value: showQuerySectionValue,
    onSetValue: onShowQuerySectionValue,
  } = useQueryString('showQuery', 'true');
  const hanldeQuerySectionButtonClick = (): void => {
    if (showQuerySectionValue === 'true') {
      onShowQuerySectionValue('false');
    } else {
      onShowQuerySectionValue('true');
    }
  };
  const showQuerySectionBool = useMemo(() => {
    return showQuerySectionValue === 'true';
  }, [showQuerySectionValue]);

  const {
    value: displayTypeValue,
    onSetValue: onDisplayTypeValue,
  } = useQueryString('displayType', 'table');
  const handleDisplayTypeChange = (): void => {
    if (displayTypeValue === 'table') {
      onDisplayTypeValue('card');
    } else {
      onDisplayTypeValue('table');
    }
  };
  const showTableDisplay = useMemo(() => {
    return displayTypeValue === 'table';
  }, [displayTypeValue]);

  return (
    <div className="container mx-auto px-6 text-white">
      <ToastContainer autoClose={3000} pauseOnHover />
      <h1 className="flex justify-center mb-8">Pokemon</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
        onClick={handleTinyURLButtonClick}
        type="button"
      >
        Create tinyURL and copy to clipboard
      </button>
      <div className="border-solid border-4 border-gray-600 p-1">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
          onClick={hanldeQuerySectionButtonClick}
          type="button"
          // eslint-disable-next-line prettier/prettier
        >
          {showQuerySectionBool ? 'Hide ' : 'Show '}
          Query Section
        </button>
        {showQuerySectionBool && (
          <div className="grid grid-cols-2 gap-2 py-2">
            <label className="col-span-1" htmlFor="uri">
              URI:
              <input
                type="text"
                className="w-full box-border border-4 border-gray-400 bg-gray-200 text-black"
                id="uri"
                name="name"
                onChange={handleURIChange}
                value={uri}
              />
            </label>
            <div className="col-span-1 flex flex-col">
              <label htmlFor="queryText">
                Query:
                <textarea
                  className="box-border h-64 w-full p-2 border-4 border-gray-400 bg-gray-200 text-black"
                  id="queryText"
                  onChange={handleQueryChange}
                  value={queryText}
                />
              </label>
            </div>
          </div>
        )}
      </div>
      <div className="border-solid border-4 border-gray-600 p-1">
        {loading && <p className="container mx-auto px-6">Data Is loading</p>}
        {gqlError && (
          <p className="container mx-auto px-6">{gqlError.message}</p>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
          onClick={handleDisplayTypeChange}
          type="button"
        >
          {showTableDisplay ? 'Show Card Display ' : 'Show Table Display'}
        </button>
        {showTableDisplay ? (
          <TableDisplay data={queryResultData} />
        ) : (
          <CardDisplay data={queryResultData} />
        )}
      </div>
    </div>
  );
};
export default Pokemon;
