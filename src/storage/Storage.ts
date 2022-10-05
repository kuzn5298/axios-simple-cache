import { StorageInstance, StorageOptions } from '../types';

// Default storage options
export const DEFAULT_CAPACITY = 100;

export class Storage implements StorageInstance {
    #storage!: any;
    #capacity!: number;

    constructor(options?: StorageOptions) {
        this.#storage = new Map();
        this.#capacity = options?.capacity ?? DEFAULT_CAPACITY;
    }

    #getLastUsed() {
        return this.#storage.keys().next().value;
    }

    has(key: string) {
        return this.#storage.has(key);
    }

    get(key: string) {
        if (!this.has(key)) {
            return -1;
        }

        const item = this.#storage.get(key);

        // refresh key
        this.#storage.delete(key);
        this.#storage.set(key, item);
        return item;
    }

    set(key: string, value: any) {
        // refresh key
        this.#storage.delete(key);

        // delete oldest
        if (this.#storage.size === this.#capacity) {
            this.#storage.delete(this.#getLastUsed());
        }

        this.#storage.set(key, value);
    }
}
