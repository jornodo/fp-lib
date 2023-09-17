// Option class
// A class that wraps a value in an Option
// Contains methods to apply functions on the wrapped value, handle errors, handle no value and unwrap the value
export class Option<T> {
    private readonly value: T;

    private constructor(value: T) {
        this.value = value;

        this.isPresent = this.isPresent.bind(this);
        this.ifPresent = this.ifPresent.bind(this);
        this.map = this.map.bind(this);  
        this.orElseGet = this.orElseGet.bind(this);
        this.get = this.get.bind(this);
  
    }

    // Checks if the value is present
    // @returns {boolean} true if value is present, false otherwise
    isPresent(): boolean {
        return this.value !== undefined;
    }

    // Executes the given function if the value is present
    // @param {Function} fn - function to be executed if value is present
    // @returns {void} 
    ifPresent(fn: (value: T) => void): Option<T> {
        this.isPresent() ? fn(<T> this.value) : undefined;

        return this;
    }
    

    // get the value if present
    // @returns {T} the value if present, undefined otherwise
    get(): T | undefined {
        return this.value;
    }

    // Applies the given function on the current Options value
    // @param {Function} fn - function to be applied on the current Options value
    // @returns {Option<U>} an Option with the value returned by the given function applied on the current Options value
    map<U>(fn: (value: T) => U): Option<U> {
        if (this.value !== undefined) {
            return new Option(<U>fn(this.value));
        }
        
        return this as unknown as Option<U>;
    }

    // Returns the value if present, the given default value otherwise
    // @param {T} defaultValue - the value to be returned if no value is present
    // @returns {T} the value if present, the given default value otherwise
    orElseGet(defaultValue: T): T {
        if (this.value !== undefined) {
            return this.value;
        }
        return defaultValue;
    }

    // Wraps the given value in an Option
    // @param {T} value - the value to be wrapped in an Option
    // @returns {Option<T>} an Option with the given value
    static of<T>(value: T): Option<T> {
        return new Option(value);
    }
}