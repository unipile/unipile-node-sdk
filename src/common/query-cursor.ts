import { Kind, Type, TypeRegistry } from '@sinclair/typebox';
import { TypeSystem } from '@sinclair/typebox/system';

import { Base64, isBase64 } from './core.types.tmp.js';

/**
 * @note Opaque type.
 */
declare const validEncodedQueryCursor: unique symbol;
export type EncodedQueryCursor = Base64 & { [validEncodedQueryCursor]: true };

const ENCODED_QUERY_CURSOR_KIND = 'EncodedQueryCursor';

/**
 * Register the custom TypeBox kind once. `TypeSystem.Type` throws
 * `TypeSystemDuplicateTypeKind` if this module is evaluated twice (common with
 * dual CJS/ESM resolution), so fall back to a factory that reuses the existing kind.
 */
function registerEncodedQueryCursorType() {
  if (!TypeRegistry.Has(ENCODED_QUERY_CURSOR_KIND)) {
    return TypeSystem.Type<EncodedQueryCursor>(
      ENCODED_QUERY_CURSOR_KIND,
      (_options, value) => typeof value === 'string' && isBase64(value),
    );
  }

  return (options: Record<PropertyKey, unknown> = {}) =>
    Type.Unsafe<EncodedQueryCursor>({ ...options, [Kind]: ENCODED_QUERY_CURSOR_KIND });
}

export const EncodedQueryCursorType = registerEncodedQueryCursorType();
