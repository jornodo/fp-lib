interface IOption<T> {
    readonly value?: T;
    readonly error?: Error;

    isPresent: () => boolean;
    ifPresent: (fn: (value: T) => void) => void; // Evil side effect
    map: (fn: (value: T) => T) => IOption<T>;
    getOrElse: (defaultValue: T) => T;
    get: () => T | Error | undefined;
    tryCatch: (fn: () => T) => IOption<T>;
}


// Option class
// A class that wraps a value in an Option
// Contains methods to apply functions on the wrapped value, handle errors, handle no value and unwrap the value
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

    // Checks if the value is present
    // @returns {boolean} true if value is present, false otherwise
    isPresent(): boolean {
        return this.value !== undefined;
    }

    // Executes the given function if the value is present
    // @param {Function} fn - function to be executed if value is present
    // @returns {void} 
    ifPresent(fn: (value: T) => void): void {
        this.isPresent() ? fn(<T> this.value) : undefined;
    }
    

    // get the value if present
    // @returns {T} the value if present, undefined otherwise
    get(): T | Error | undefined {
        return this.value ? <T> this.value 
            : this.error ? this.error
            : <T> undefined;
    }

    // Applies the given function on the current Options value
    // @param {Function} fn - function to be applied on the current Options value
    // @returns {Option<T>} an Option with the value returned by the given function applied on the current Options value
    map(fn: (value: T) => T): IOption<T> {
        if (this.value !== undefined) {
            return new Option(fn(this.value));
        }
        return new Option(<T> undefined, new Error('No value'));
    }

    // Returns the value if present, the given default value otherwise
    // @param {T} defaultValue - the value to be returned if no value is present
    // @returns {T} the value if present, the given default value otherwise
    getOrElse(defaultValue: T): T {
        if (this.value !== undefined) {
            return this.value;
        }
        return defaultValue;
    }

    // Applies the given function on the current Options value
    // @param {Function} fn - function to be applied on the current Options value
    // @returns {Option<T>} an Option with the value returned by the given function applied on the current Options value
    tryCatch(fn: (t: T) => T): Option<T>{
        if(this.value === undefined) return new Option(<T>undefined, new Error('No value'));

        try {
            return new Option(fn(<T> this.value));
        } catch (error) {
            return new Option(<T> undefined, <Error>error);
        }
    } 

    // Wraps the given value in an Option
    // @param {T} value - the value to be wrapped in an Option
    // @returns {Option<T>} an Option with the given value
    static of<T>(value: T): Option<T> {
        return new Option(value);
    }
}