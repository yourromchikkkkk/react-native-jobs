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
  job_employment_type: string;
  job_description: string;
  job_google_link: string;
  job_highlights: {
    Qualifications?: string[];
    Responsibilities?: string[];
    Benefits?: string[];
  };
};

export interface FetchResponse {
  status: string;
  request_id: string;
  paramenters: QueryParamenters;
  data: JobDetails[];
}
