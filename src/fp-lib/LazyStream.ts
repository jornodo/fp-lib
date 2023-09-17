export class Stream<T> {
    constructor(private elements: Promise<T>[]) {
        this.elements = elements.filter((element) => element !== undefined)
            .map((element) => Promise.resolve(element as T));
    }

    static of<T> (elements: Promise<T>[]): Stream<T> {
        return new Stream(elements);
    }

    filter(predicate: (element: T) => boolean): Stream<T> {
        const newElements = this.elements.filter((element) => element.then(predicate));

        return new Stream(newElements);
    }

    map<U>(mapper: (element: T) => U): Stream<U> {
        const newElements = this.elements.map((element) => element.then(mapper));

        return new Stream(newElements);
    }

    // terminal operations
    forEach(consumer: (element: T) => void): void {
        this.elements.forEach((element) => element.then(consumer));
    }

    toList(): Promise<T[]> {
        return Promise.all(this.elements);
    }

    getAny(): Promise<T | undefined> {
        return this.elements[0];
    }

    


    
   
}