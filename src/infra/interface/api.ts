import axios, { HttpStatusCode } from 'axios';
import { getAccessToken, refreshSession } from '../aws/cognito';
import { OrganizationApi, UserApi, UserOrganizationApi } from './openapi';
import { Configuration } from './openapi/configuration';

const API_URL = process.env.NEXT_PUBLIC_HOST_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized
    ) {
      try {
        refreshSession();
        const accessToken = await getAccessToken();

        // リクエストを再試行
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
        console.error('リフレッシュトークンが無効です。再ログインが必要です。');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const config = new Configuration({});

export const organizationApi = new OrganizationApi(config, '', axiosInstance);

export const userApi = new UserApi(config, '', axiosInstance);

export const userOrganizationApi = new UserOrganizationApi(
  config,
  '',
  axiosInstance,
);
