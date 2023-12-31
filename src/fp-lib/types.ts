interface IStream<T, Self extends IStream<any, any>> {
    map<U>(mapper: (element: T) => U | Promise<U>): Self;
    
  }
  
type Mapper<T, U> = (element: T) => U | Promise<U>;