import { HttpUrl, isHttpUrl } from './core.types.tmp.js';
import { registeredType } from './type-system.js';

/**
 *
 */
export const HttpUrlType = registeredType<HttpUrl>(
  'HttpUrl',
  (_options, value) => isHttpUrl(value),
);
