import { AxiosResponse } from 'axios';
import { HEADER_PARAMETER_KEY } from '../constants';
import { CacheStatus } from '../enums';
import { InterceptorOptions } from '../types';
import {
    genHashByAxiosConfig,
    getExpireTime,
    getMilliseconds,
    isCacheExpired,
    isCacheMethod,
    objectParametersToString,
    parseCacheResponse,
    stringParametersToObject,
} from '../utils';

export const responseHandler =
    ({ storage, methods }: InterceptorOptions) =>
    (response: AxiosResponse) => {
        // ignore not cache methods
        if (!isCacheMethod(response.config.method, methods)) {
            return response;
        }

        const hashKey = genHashByAxiosConfig(response.config);

        const expireAt = getExpireTime(response.headers);

        // cached data is expired
        if (isCacheExpired(expireAt)) {
            return response;
        }

        const { status: cacheStatus } = stringParametersToObject(
            response.headers[HEADER_PARAMETER_KEY]
        );

        // skip re-set to cache if data cached
        if (cacheStatus === CacheStatus.CACHED) {
            return response;
        }

        const now = getMilliseconds();

        const cacheParameters = {
            createdAt: now,
            expireAt,
            status: CacheStatus.CACHED,
        };

        const cacheResponse = parseCacheResponse(response, cacheParameters);

        cacheResponse.headers[HEADER_PARAMETER_KEY] =
            objectParametersToString(cacheParameters);

        storage.set(hashKey, cacheResponse);

        return response;
    };

export const responseErrorHandler = (error: any) => {
    return Promise.reject(error);
};
