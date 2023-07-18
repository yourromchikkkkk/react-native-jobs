import axios from 'axios';

import type { JobDetails, FetchResponse } from './types/fetch';
import { EXPO_PUBLIC_RAPID_API_KEY } from './environment-variables';

interface ISearchJobs {
  query: string;
  pageNum: number;
}

const searchJobs = async ({
  query,
  pageNum,
}: ISearchJobs): Promise<JobDetails[]> => {
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/search`,
    headers: {
      'X-RapidAPI-Key': EXPO_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: {
      query: query,
      page: pageNum,
    },
  };

  const response = await axios.request(options);
  const responseData = response.data as FetchResponse;
  return responseData.data;
};

export default searchJobs;
