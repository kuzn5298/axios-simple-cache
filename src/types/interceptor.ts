import { CacheMethod } from './cache';
import { StorageInstance } from './storage';

export interface InterceptorOptions {
    storage: StorageInstance;
    methods: CacheMethod[];
}
