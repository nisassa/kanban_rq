import axios, { AxiosRequestConfig, Method } from "axios";

export interface ICallApi extends AxiosRequestConfig {
  url: string;
  method: Method;
  headers?: any;
  data?: unknown;
  params?: Record<string, unknown>;
  timeout?: 30000;
}

const CallApi = <T>({
  url,
  method,
  headers,
  data,
  params,
  timeout
}: ICallApi) => {
  const config: AxiosRequestConfig = {
    method,
    data,
    params,
    url,
    timeout,
    headers: {
      ...headers,
    },
  };
  return axios.request(config);
};

export default CallApi;
