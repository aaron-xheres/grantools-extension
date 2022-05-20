import {resolve} from 'path';

export const r = (...args: string[]) => resolve(__dirname, '..', ...args);
