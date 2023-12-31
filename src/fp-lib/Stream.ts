import { AsyncStream } from "./AsyncStream";

export class Stream<T> {
    constructor(protected generator: Generator<T, void, unknown>) {}

    static of<T> (elements: T[]): Stream<T> {
        function* generator() {
            for(const element of elements) {
                yield element;
            }
        }

        return new Stream(generator());
    }

    static infinite(): Stream<number> {
        let i = 0;
        function* generator() {
            while(true) {
                yield i++;
            }
        }

        return new Stream(generator());
    }

    static infiniteFrom(start: number): Stream<number> {
        function* generator() {
            while(true) {
                yield start++;
            }
        }

        return new Stream(generator());
    }

    concat(stream: Stream<T>): Stream<T> {
        const self = this;

        function* generator() {
            for(const element of self.generator) {
                yield element;
            }

            for(const element of stream.generator) {
                yield element;
            }
        }

        return new Stream(generator());

    }

    filter(predicate: (element: T) => boolean): Stream<T> {
        const self = this;

        function* generator() {
            for(const element of self.generator) {
                
                if(predicate(element)) {
                    yield element;
                }
            }
        }

        return new Stream(generator());
    }


    map<U>(mapper: (element: T) => U): Stream<U> {
        const self = this;

        function* generator() {
            for(const element of self.generator) {

                yield mapper(element);
            }
        }

        return new Stream(generator());
    }

  // Method to convert Stream to AsyncStream
  toAsyncStream<U>(mapper: (element: T) => Promise<U>): AsyncStream<U> {
    const self = this;
    async function* generator() {
      for (const element of self.generator) {
        yield await mapper(element);
      }
    }
    return new AsyncStream(generator());
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