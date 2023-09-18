export class GStream<T> {
    constructor(private generator: Generator<T, void, unknown>) {}

    static of<T> (elements: T[]): GStream<T> {
        function* generator() {
            for(const element of elements) {
                yield element;
            }
        }

        return new GStream(generator());
    }

    static infinite(): GStream<number> {
        let i = 1;
        function* generator() {
            while(true) {
                yield i++;
            }
        }

        return new GStream(generator());
    }

    static infiniteFrom(start: number): GStream<number> {
        function* generator() {
            while(true) {
                yield start++;
            }
        }

        return new GStream(generator());
    }

    concat(stream: GStream<T>): GStream<T> {
        const self = this;

        function* generator() {
            for(const element of self.generator) {
                yield element;
            }

            for(const element of stream.generator) {
                yield element;
            }
        }

        return new GStream(generator());

    }

    filter(predicate: (element: T) => boolean): GStream<T> {
        const self = this;

        function* generator() {
            for(const element of self.generator) {
                
                if(predicate(element)) {
                    yield element;
                }
            }
        }

        return new GStream(generator());
    }

    map<U>(mapper: (element: T) => U): GStream<U> {
        const self = this;

        function* generator() {
            for(const element of self.generator) {

                yield mapper(element);
            }
        }

        return new GStream(generator());
    }

    // terminal operations
    forEach(consumer: (element: T) => void): void {
        for(const element of this.generator) {
            consumer(element);
        }
    }

    toList(): T[] {
        return [...this.generator];
    }

    getAny(): T | undefined {
        return <T | undefined>this.generator.next().value;
    }

    
    // recursively get n elements
    getNElements(n: number): T[] {
        const getNElementsHelper = (index: number, acc: T[]): T[] => {
            return index === n 
                ? acc
                : getNElementsHelper(index + 1, [...acc, <T> this.generator.next().value]);
        }

        return getNElementsHelper(0, []);
    }
        
}