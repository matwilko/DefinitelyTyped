// Type definitions for deep-freeze 0.1
// Project: https://github.com/substack/deep-freeze
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>, Aluan Haddad <https://github.com/aluanhaddad>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1

export = deepFreeze;

declare function deepFreeze<T>(o: T): deepFreeze.DeepReadonly<T>;

type IsEqual<A, B> =
	(<G>() => G extends A ? 1 : 2) extends
	(<G>() => G extends B ? 1 : 2)
		? true
		: false;

declare namespace deepFreeze {
    type TypesNotChanged = never | null | undefined | string | number | boolean | symbol | bigint | Function;

    type DeepReadonly<T> = IsEqual<T, unknown> extends true
        ? unknown
        : T extends TypesNotChanged
            ? T
            : { readonly [P in keyof T]: DeepReadonly<T[P]> };
}


// TODO:
// Type definitions for deep-freeze 0.1
// Project: https://github.com/substack/deep-freeze
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>, Aluan Haddad <https://github.com/aluanhaddad>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1

export = deepFreeze;

type Primitive = null | undefined | string | number | boolean | symbol | bigint;
type IfTrue<T, TTrue = true, TFalse = false> = T extends true ? TTrue : TFalse;
type IfNever<T, TTrue = true, TFalse = false> = T extends never ? TTrue : TFalse;
type IfAny<T0, T1, T2 = false, T3 = false, T4 = false, T5 = false, T6 = false, T7 = false, T8 = false, T9 = false, T10 = false> = IfTrue<T0, true, IfTrue<T1, true, IfTrue<T2, true, IfTrue<T3, true, IfTrue<T4, true, IfTrue<T5, true, IfTrue<T6, true, IfTrue<T7, true, IfTrue<T8, true, IfTrue<T9, true, IfTrue<T10>>>>>>>>>>>;

type HasNeverPropertiesDeep<T> = ({
	[Key in keyof T]: CollapseNever<T[Key]> extends never ? true : false
}[keyof T]) extends false ? false : true;

type HasNeverTupleElements<T> = T extends [infer T0, ...(infer TRest)]
	? IfNever<T0, true, IfTrue<HasNeverTupleElements<TRest>>>
	: T extends readonly [infer T0, ...(infer TRest)]
		? IfNever<T0, true, IfTrue<HasNeverTupleElements<TRest>>>
		: false;

type HasNeverArrayElements<T> = T extends []
	? false
	: T extends readonly []
		? false
		: T extends never[]
			? true
			: T extends readonly never[]
				? true
				: false;

type IsTupleType<T> = IfAny<T extends [infer T0, ...(infer TRest)] ? true : false, T extends readonly [infer T0, ...(infer TRest)] ? true : false>;

type IsArrayType<T> = IfAny<T extends [] ? true : false, T extends readonly[] ? true : false, T extends any[] ? true : false, T extends readonly any[] ? true : false>;

type CollapseNever<T> = T extends Primitive
	? T
	: IsTupleType<T> extends true
		? IfTrue<HasNeverTupleElements<T>, never, T>
		: IsArrayType<T> extends true
			? IfTrue<HasNeverArrayElements<T>, never, T>
			: IfTrue<HasNeverPropertiesDeep<T>, never, T>;


declare function deepFreeze<T>(obj: T): deepFreeze.DeepReadonly<T>;

declare namespace deepFreeze {
    type TypesThatThrow = DataView | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
    type TypesUnsupported = Map<any, any> | WeakMap<any, any> | WeakSet<any> | Set<any> | Promise<any>;
    type TypesNotChanged = never | null | undefined | string | number | boolean | symbol | bigint | Function;

    type DeepReadonly<T> = CollapseNever<
        T extends TypesThatThrow
            ? never
            : T extends TypesNotChanged
                ? T
                : { readonly [P in keyof T]: DeepReadonly<T[P]> }
    >;
}

type PartFreeze<T extends TNotFrozen, TNotFrozen> = IsEmptyObject<Except<T, keyof TNotFrozen>> extends true
	? TNotFrozen
	: TNotFrozen & deepFreeze.DeepReadonly<Except<T, keyof TNotFrozen>>;

interface FrozenMap<Key, Value> extends Readonly<Map<Key, Value>> {}
interface FrozenWeakMap<Key extends object, Value> extends Readonly<WeakMap<Key, Value>> {}
interface FrozenSet<Value> extends Readonly<Set<Value>> {}
interface FrozenWeakSet<Value extends object> extends Readonly<WeakSet<Value>> {}
interface FrozenArrayBuffer extends Readonly<ArrayBuffer> {}

declare namespace deepFreeze {
    type TypesUnsupported = ArrayBuffer | DataView | Promise<any>;
    type TypesNotChanged = never | null | undefined | string | number | boolean | symbol | bigint | Function | TypesUnsupported;

    type DeepReadonly<T> = T extends Map<infer Key, infer Value>
        	? PartFreeze<T, FrozenMap<Key, Value>>
			: T extends WeakMap<infer Key, infer Value>
				? PartFreeze<T, FrozenWeakMap<Key, Value>>
				: T extends WeakSet<infer Value>
					? PartFreeze<T, FrozenWeakSet<Value>>
					: T extends Set<infer Value>
						? PartFreeze<T, FrozenSet<Value>>
							: T extends ArrayBuffer
								? PartFreeze<T, ArrayBuffer>
								: T extends DataView

							: { readonly [P in keyof T]: DeepReadonly<T[P]> };
}
