import { Stream } from './Stream';

export class AsyncStream<T> implements IStream<T, AsyncStream<T>> {
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
  
    // ... (other async methods)
  }