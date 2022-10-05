import { AxiosInstance } from 'axios';
import { Storage } from './storage';
import { DEFAULT_CACHE_METHODS } from './constants';
import { setupInterceptorCache } from './interceptors';
import { SetupAxiosCacheOptions } from './types';

export const setupAxiosCache = (
    axiosInstance: AxiosInstance,
    { storage, storageOptions, methods }: SetupAxiosCacheOptions = {}
) => {
    storage ??= new Storage(storageOptions);
    methods ??= DEFAULT_CACHE_METHODS;
    setupInterceptorCache(axiosInstance, { storage, methods });

    return axiosInstance;
};
