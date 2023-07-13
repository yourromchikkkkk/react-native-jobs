export interface QueryParamenters {
  query: string;
  page: number;
  num_pages: number;
}

export type JobDetails = {
  job_id: string;
  employer_name: string;
  employer_logo: string;
  job_title: string;
  job_country: string;
};

type SearchFilterDataKeys =
  | 'categories'
  | 'job_titles'
  | 'company_types'
  | 'employers'
  | 'date_posted'
  | 'employment_types'
  | 'job_requirements';

type SearchFilterDataType = {
  [key in SearchFilterDataKeys]: {
    name: string;
    value: string;
    est_count: string;
  }[];
};

export interface FetchResponse {
  status: string;
  request_id: string;
  paramenters: QueryParamenters;
  data: JobDetails[] | SearchFilterDataType[];
}
