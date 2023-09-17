export class Stream<T> {
    constructor(private elements: T[]) {
        this.elements = elements.filter((element) => element !== undefined);
    }
    
    static of<T> (elements: T[]): Stream<T> {
        return new Stream(elements);
    }

    filter(predicate: (element: T) => boolean): Stream<T> {
        return new Stream(this.elements.filter(predicate));
    }

    map<U>(mapper: (element: T) => U): Stream<U> {
        console.log(`mapping with ${mapper}, and elements: ${this.elements}`);

        return this.mapHelper(0, [], mapper);
    }

    private mapHelper<U>(index: number, acc: U[], mapper: (element: T) => U): Stream<U> {
        if(index >= this.elements.length - 1) {
            return new Stream(acc);
        }

        return this.mapHelper(index + 1, [...acc, mapper(this.elements[index])], mapper);
    }

    forEach(consumer: (element: T) => void): void {
        this.elements.forEach(consumer);
    }

    toList(): T[] {
        return this.elements;
    }

    getAny(): T | undefined {
        return this.elements[0];
    }
    

    flatMap<U>(mapper: (element: T) => Stream<U>): Stream<U> {
        return new Stream(this.elements.map(mapper)
            .map((stream) => stream.toList())
            .reduce((acc, curr) => acc.concat(curr), []));
    }

    concat(stream: Stream<T>): Stream<T> {
        return new Stream([...this.elements, ...stream.toList()]);
    }

    reduce<U>(reducer: (acc: U, cur: T) => U): U {
        console.log(`reducing with ${reducer}, and elements: ${this.elements}`);

        if(this.elements.length === 0) {
            throw new Error('Cannot reduce empty stream');
        }

        return this.reduceHelper(0, this.elements[0] as unknown as U, reducer);
    }

    private reduceHelper<U>(index: number, acc: U, reducer: (acc: U, cur: T) => U): U {
        if(index >= this.elements.length - 1) {
            return acc;
        }

        if( this.elements[index] === undefined) {
            return this.reduceHelper(index + 1, acc, reducer);
        }

        return this.reduceHelper(index + 1, reducer(acc, this.elements[index]), reducer);
    }

    static range(start: number, end: number): Stream<number> {
        return new Stream(Array.from({length: end - start + 1}, (_, i) => i + start));
    }
}