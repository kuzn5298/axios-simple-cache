import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { CacheResponse, InterceptorOptions } from '../types';
import { isCacheMethod, isCacheExpired, genHashByAxiosConfig } from '../utils';

export const requestHandler =
    ({ storage, methods }: InterceptorOptions) =>
    (config: AxiosRequestConfig) => {
        // ignore not cache methods
        if (!isCacheMethod(config.method, methods)) {
            return config;
        }

        const hashKey = genHashByAxiosConfig(config);
        const cached = storage.has(hashKey);

        // data is not cached
        if (!cached) {
            return config;
        }

        const cachedResponse = storage.get(hashKey) as CacheResponse;

        const { expireAt } = cachedResponse.cacheParameters;

        // cached data is expired
        if (isCacheExpired(expireAt)) {
            return config;
        }

        config.adapter = (): AxiosPromise => {
            return Promise.resolve({
                status: cachedResponse.status,
                statusText: cachedResponse.statusText,
                headers: cachedResponse.headers,
                config: config,
                data: cachedResponse.data,
            });
        };
    };
