import { useState, useEffect } from 'react';
import axios from 'axios';

import { EXPO_PUBLIC_RAPID_API_KEY } from '@/utils/environment-variables';

type QueryType = {
  query: string;
  page: number;
  num_pages: number;
};

type UseFetchType = {
  data: any;
  isLoading: boolean;
  error: Error | undefined;
  refetch: () => void;
};

const GET_METHOD_TYPE = 'GET';

const useFetch = (endpoint: string, query: QueryType): UseFetchType => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const url = new URL(endpoint, 'https://jsearch.p.rapidapi.com');

  const options = {
    method: GET_METHOD_TYPE,
    url: url.href,
    params: {
      ...query,
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
      setData(response.data as any);
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
