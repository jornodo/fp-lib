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

    filter(predicate: (element: T) => boolean): GStream<T> {
        const self = this;

        function* generator() {
            for(const element of self.generator) {
                console.log(`filtering with ${predicate}, and element: ${element}`);
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
                console.log(`mapping with ${mapper}, and element: ${element}`);
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
        
}