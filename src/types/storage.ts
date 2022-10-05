export interface StorageInstance {
    set(key: string, value: any): void;
    get(key: string): any;
    has(key: string): boolean;
}

export interface StorageOptions {
    capacity?: number;
}
