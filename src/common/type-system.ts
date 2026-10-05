import {
  FormatRegistry,
  Kind,
  Type,
  TypeRegistry,
  UnsafeOptions,
} from '@sinclair/typebox';

export function registeredType<T>(
  kind: string,
  check: (options: Record<PropertyKey, unknown>, value: unknown) => boolean,
) {
  if (!TypeRegistry.Has(kind)) {
    TypeRegistry.Set(kind, check);
  }

  return (options: UnsafeOptions = {}) =>
    Type.Unsafe<T>({
      ...options,
      [Kind]: kind,
    });
}

export function registeredFormat<F extends string>(
  format: F,
  check: (value: string) => boolean,
): F {
  if (!FormatRegistry.Has(format)) {
    FormatRegistry.Set(format, check);
  }
  return format;
}
