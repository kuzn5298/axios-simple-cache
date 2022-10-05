import md5 from 'md5';
import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { CacheMethod, CacheParameters, CacheResponse } from '../types';
import {
    getMilliseconds,
    sortObject,
    stringParametersToObject,
} from './common';
import { Header } from '../enums';

export const isCacheMethod = (
    method: string | undefined,
    cachedMethods: CacheMethod[]
): boolean => {
    return cachedMethods.some(
        (cachedMethod) => cachedMethod.toLowerCase() === method?.toLowerCase()
    );
};

export const isCacheExpired = (expireAt: number) => {
    const now = getMilliseconds();
    return now >= expireAt;
};

export const genHashByAxiosConfig = (config: AxiosRequestConfig) => {
    const method = config.method?.toLocaleLowerCase();
    const target = {
        method: method,
        url: config.url,
        params: method === 'get' ? sortObject(config.params) : null,
        data: method === 'post' ? sortObject(config.data) : null,
    };

    return md5(JSON.stringify(target));
};

export const parseCacheResponse = (
    response: AxiosResponse,
    cacheParameters: CacheParameters
): CacheResponse => ({
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    cacheParameters,
});

export const getExpireTime = (headers: AxiosResponseHeaders): number => {
    const cacheControl = headers?.[Header.CacheControl];
    const now = getMilliseconds();

    if (cacheControl) {
        const { noCache, noStore, maxAge } =
            stringParametersToObject(cacheControl);

        // Response should not be cached.
        if (noCache || noStore) {
            return 0;
        }

        if (maxAge !== undefined) {
            const age = headers[Header.Age];

            const maxAgeMs = (age ? +maxAge - +age : +maxAge) * 1000;
            return now + maxAgeMs;
        }
    }

    const expires = headers?.[Header.Expires];

    if (expires) {
        const expireMs = getMilliseconds(expires);
        return expireMs > now ? expireMs : 0;
    }

    return 0;
};
