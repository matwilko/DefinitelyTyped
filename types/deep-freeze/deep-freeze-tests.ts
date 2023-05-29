import df = require('deep-freeze');

type IsEqual<A, B> =
	(<G>() => G extends A ? 1 : 2) extends
	(<G>() => G extends B ? 1 : 2)
		? true
		: false;

type Test<T, Expected> = IsEqual<df.DeepReadonly<T>, Expected>;

class Foo {
    foo: string;
}
const foo = df(new Foo());
const items = df([{id: 0, name: 'first'}]);
const functionTest = df({id: 0, name: 'first', update: (blah: boolean) => blah});

functionTest.update(true);

type MapsToSelf<T> = Test<T, T>;
const unknownMapsToUnknown: MapsToSelf<unknown> = true;
const anyMapsToAny: MapsToSelf<any> = true;
const neverMapsToNever: MapsToSelf<never> = true;
const nullMapsToNull: MapsToSelf<null> = true;
const undefinedMapsToUndefined: MapsToSelf<undefined> = true;
const stringMapsToString: MapsToSelf<string> = true;
const numberMapsToNumber: MapsToSelf<number> = true;
const booleanMapsToBoolean: MapsToSelf<boolean> = true;
const symbolMapsToSymbol: MapsToSelf<symbol> = true;
const bigintMapsToBigint: MapsToSelf<bigint> = true;
const functionMapsToFunction: MapsToSelf<Function> = true;
const typedFunctionMapsToSelf: MapsToSelf<(a: number) => string> = true;

const emptyArray: Test<[], readonly []> = true;
const primitiveArray: Test<number[], readonly number[]> = true;
const objectArray: Test<{ a: string }[], readonly { readonly a: string }[]> = true;
const arrayOfPrimitiveArrays: Test<(number[])[], readonly (readonly number[])[]> = true;
const arrayOfObjectArrays: Test<({ a: string }[])[], readonly (readonly { readonly a: string }[])[]> = true;

const tupleElements: Test<
[number, string, { a: string }, number[], { a: string }[], { a: string[] }],
readonly [number, string, { readonly a: string }, readonly number[], readonly { readonly a: string }[], { readonly a: readonly string[] }]
> = true;

const emptyObject: Test<{}, {}> = true;
const simpleObject: Test<{ a: number }, { readonly a: number }> = true;
const nestedObject: Test<{ a: { b: number } }, { readonly a: { readonly b: number } }> = true;
const arrayNestedInObject: Test<{ a: number[] }, { readonly a: readonly number[] }> = true;
const objectArrayNestedInObject: Test<{ a: { b: number }[] }, { readonly a: readonly { readonly b: number }[] }> = true;
