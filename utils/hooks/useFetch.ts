import { useState, useEffect } from 'react';
import axios from 'axios';

import type { FetchResponse } from '../types/fetch';

import { EXPO_PUBLIC_RAPID_API_KEY } from '@/utils/environment-variables';

type ParamsType = {
  query: string;
  page?: number;
  num_pages: number;
};

type UseFetchType = {
  data: FetchResponse['data'] | undefined;
  isLoading: boolean;
  error: Error | undefined;
  refetch: () => void;
};

const GET_METHOD_TYPE = 'GET';

const useFetch = (endpoint: string, params: ParamsType): UseFetchType => {
  const [data, setData] = useState<FetchResponse['data']>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const url = new URL(endpoint, 'https://jsearch.p.rapidapi.com');

  const options = {
    method: GET_METHOD_TYPE,
    url: url.href,
    params: {
      ...params,
    },
    headers: {
      'X-RapidAPI-Key': EXPO_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };

  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.request(options);

      if (response.status !== 200) {
        throw new Error(`Data  fetching error with  query = ${params.query}`);
      }

      const responseData = response.data as FetchResponse;
      setData(responseData.data);
    } catch (error) {
      setError(error as Error);
      console.error(error);
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = (): void => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
