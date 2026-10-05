import { Base64, isBase64 } from './core.types.tmp.js';
import { registeredType } from './type-system.js';

/**
 * @note Opaque type.
 */
declare const validEncodedQueryCursor: unique symbol;
export type EncodedQueryCursor = Base64 & { [validEncodedQueryCursor]: true };

/**
 *
 */
export const EncodedQueryCursorType = registeredType<EncodedQueryCursor>(
  'EncodedQueryCursor',
  (_options, value) => typeof value === 'string' && isBase64(value),
);
