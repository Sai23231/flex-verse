import axios from 'axios';
import cookie from 'react-cookies';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export const apiClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const token = cookie.load('_auth');
    if (token) {
      config = {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return axiosInstance
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse<T>) => response.data);
  },

  post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    const token = cookie.load('_auth');
    if (token) {
      config = {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return axiosInstance
      .post(url, data, config)
      .then((response: AxiosResponse<R>) => response.data);
  },
};

export default apiClient;
