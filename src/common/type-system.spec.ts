import { FormatRegistry, Kind, TypeRegistry } from '@sinclair/typebox';
import { registeredFormat, registeredType } from './type-system.js';

describe('registered TypeBox extensions', () => {
  afterEach(() => {
    TypeRegistry.Delete('TestExistingType');
    FormatRegistry.Delete('test-existing-format');
  });

  it('reuses an already-registered type kind instead of throwing', () => {
    TypeRegistry.Set('TestExistingType', () => true);

    expect(() =>
      registeredType<string>('TestExistingType', () => false),
    ).not.toThrow();

    const schema = registeredType<string>('TestExistingType', () => false)();
    expect(schema[Kind]).toBe('TestExistingType');
    expect(TypeRegistry.Get('TestExistingType')?.(schema, 'value')).toBe(true);
  });

  it('reuses an already-registered string format instead of throwing', () => {
    FormatRegistry.Set('test-existing-format', () => true);

    expect(() =>
      registeredFormat('test-existing-format', () => false),
    ).not.toThrow();

    expect(FormatRegistry.Get('test-existing-format')?.('value')).toBe(true);
  });
});
