import { AxiosResponse } from 'axios';
import { CacheStatus } from '../enums';
import { StorageInstance, StorageOptions } from './storage';

export interface CacheParameters {
    createdAt: number;
    expireAt: number;
    status: CacheStatus;
}

export type CacheResponse = Pick<
    AxiosResponse,
    'data' | 'status' | 'statusText' | 'headers'
> & { cacheParameters: CacheParameters };

export type CacheMethod = 'GET' | 'POST' | 'get' | 'post' | string;

export interface SetupAxiosCacheOptions {
    storage?: StorageInstance;
    storageOptions?: StorageOptions;
    methods?: CacheMethod[];
}
