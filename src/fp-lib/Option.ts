interface IOption<T> {
    readonly value?: T;
    readonly error?: Error;

    isPresent: () => boolean;
    ifPresent: (fn: (value: T) => void) => void; // Evil side effect
    map: (fn: (value: T) => T) => IOption<T>;
    getOrElse: (defaultValue: T) => T;
    get: () => T;
    tryCatch: (fn: () => T) => IOption<T>;
}


export class Option<T> implements IOption<T> {
    readonly value?: T;
    readonly error?: Error;

    private constructor(value?: T, error?: Error) {
        this.value = value;
        this.error = error;

        this.isPresent = this.isPresent.bind(this);
        this.ifPresent = this.ifPresent.bind(this);
        this.map = this.map.bind(this);  
        this.getOrElse = this.getOrElse.bind(this);
        this.get = this.get.bind(this);
        this.tryCatch = this.tryCatch.bind(this);
    }

    isPresent(): boolean {
        return this.value !== undefined;
    }

    ifPresent(fn: (value: T) => void): void {
        if (this.value) {
            fn(this.value);
        }
    }

    get(): T {
        return <T>this.value;
    }

    of(value: T): IOption<T> {
        return new Option(value);
    }

    map(fn: (value: T) => T): IOption<T> {
        if (this.value) {
            return new Option(fn(this.value));
        }
        return new Option(<T> undefined, new Error('No value'));
    }

    getOrElse(defaultValue: T): T {
        if (this.value) {
            return this.value;
        }
        return defaultValue;
    }

    tryCatch(fn: (t: T) => T): Option<T>{
        if(!this.value) return new Option(<T>undefined, new Error('No value'));

        try {
            return new Option(fn(<T> this.value));
        } catch (error) {
            return new Option(<T> undefined, <Error>error);
        }
    } 

    static of<T>(value: T): Option<T> {
        return new Option(value);
    }
}