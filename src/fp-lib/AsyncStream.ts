import { Stream } from './Stream';

export class AsyncStream<T>{
    constructor(protected generator: AsyncGenerator<T, void, unknown>) {}
  
    map<U>(mapper: (element: T) => U | Promise<U>): AsyncStream<U> {
      const self = this;
  
      async function* generator() {
        for await (const element of self.generator as AsyncGenerator<T, void, unknown>) {
          yield await Promise.resolve(mapper(element));
        }
      }
  
      return new AsyncStream(generator());
    }
  
    filter<U> (predicate: (element: T) => boolean | Promise<boolean>): AsyncStream<T> {
      const self = this;
  
      async function* generator() {
        for await (const element of self.generator as AsyncGenerator<T, void, unknown>) {
          if (await Promise.resolve(predicate(element))) {
            yield element;
          }
        }
      }
  
      return new AsyncStream(generator());
    }

    async collect(n: number): Promise<T[]> {
      const result: T[] = [];
      let count = 0;
      for await (const element of this.generator) {
        if (count >= n) break;
        result.push(element);
        count++;
      }
      return result;
    }
  }