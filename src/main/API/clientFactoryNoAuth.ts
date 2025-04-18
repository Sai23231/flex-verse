import axios from 'axios';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export const apiClientNoAuth = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance
      .get(url)
      .then((response: AxiosResponse<T>) => response.data);
  },

  post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return axiosInstance
      .post(url, data, config)
      .then((response: AxiosResponse<R>) => response.data);
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance
      .delete(url)
      .then((response: AxiosResponse<T>) => response.data);
  },

  postFile<T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const axiosConfiguration = config ? { ...config } : {};
    axiosConfiguration.headers = {
      ...axiosConfiguration.headers,
      'Content-Type': undefined,
    };

    return axiosInstance
      .post(url, data, axiosConfiguration)
      .then((response: AxiosResponse<R>) => response.data);
  },
};

export default apiClientNoAuth;
