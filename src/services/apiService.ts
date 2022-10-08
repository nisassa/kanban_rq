import axios, { AxiosRequestConfig, Method } from "axios";

export interface ICallApi extends AxiosRequestConfig {
  url: string;
  method: Method;
  headers?: any;
  data?: unknown;
  params?: Record<string, unknown>;
  timeout?: 30000;
  isProtected?: boolean;
}

const CallApi = <T>({
  url,
  method,
  headers,
  data,
  params,
  timeout,
  isProtected = false,
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
  if (!isProtected) {
    console.log(axios.request(config));
  }
  return axios.request(config);
};

export default CallApi;
