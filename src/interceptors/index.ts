import { AxiosInstance } from 'axios';
import { InterceptorOptions } from '../types';
import { requestHandler } from './request';
import { responseErrorHandler, responseHandler } from './response';

export const setupInterceptorCache = (
    axiosInstance: AxiosInstance,
    options: InterceptorOptions
) => {
    axiosInstance.interceptors.request.use(requestHandler(options));
    axiosInstance.interceptors.response.use(
        responseHandler(options),
        responseErrorHandler
    );
};
