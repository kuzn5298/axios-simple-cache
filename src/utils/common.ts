import { CacheParameters } from '../types';

export const sortObject = (obj: Record<string | symbol | number, any> = {}) =>
    Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {} as any);

const kebabToCamel = (str: string) =>
    str
        .toLowerCase()
        .replace(/([-][a-z])/g, (letter) =>
            letter.toUpperCase().replace('-', '')
        );

const camelToKebab = (str: string) =>
    str.replace(/(A-Z)/g, (letter) => '-' + letter.toLowerCase());

export const stringParametersToObject = (strParameters?: string) => {
    const tokens = strParameters
        ? strParameters.replace(/\s+/g, '').split(',')
        : [];

    const parameters = tokens.reduce((acc, token) => {
        const [key, value] = token.split('=', 2);
        const camelCaseKey = kebabToCamel(key);
        acc[camelCaseKey] = value ?? true;
        return acc;
    }, {} as Record<string, string | true>);
    return parameters;
};

export const objectParametersToString = (parameters: CacheParameters) => {
    const parametersEntries = Object.entries(parameters);

    const parametersString = parametersEntries
        .map((entry) => {
            entry[0] = camelToKebab(entry[0]);
            return entry.join('=');
        })
        .join(', ');

    return parametersString;
};

export const getMilliseconds = (date?: Date | string | number) => {
    const d = date !== undefined ? new Date(date) : new Date();
    return d.getTime();
};
