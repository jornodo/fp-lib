import { log } from 'console';
import { Option } from './fp-lib/Option';
import { Stream } from './fp-lib/Stream';
import get from 'axios';
import { printAllResults } from '../Test/Benchmark';
/*
console.log('Hello World!');

const a: Option<string> = Option.of('Hello World!');

const b = Option.of(5);

const c = Option.of(undefined);




const l = [1, 2, 3, 4, undefined, 5];

const d = l.map(val => Option.of(val));


d.filter((o) => o.isPresent())
  .map(o => o.get())
  .forEach((val) => log(val));

log('------------------')

d.forEach((o) => o.ifPresent((val) => log(val)));
const t: number[] = [];

log('------------------')

d.forEach((o) => o.ifPresent((val) => t.push(val as number)));
log(t);
log('------------------')

const li = [1, 2, 3, 4, undefined, 5];

li.map(val => Option.of(val))
  .filter((o) => o.isPresent())
  .map(o => o.orElseGet(0))
  .forEach((val) => log(val));


  log('------------------')

const ls = Stream.of([1, 2, 3, 4, 5, 6, 7, 8]);
log(
  ls.map((val) => val + 6)
    .filter((val) => val % 2 === 0)
    .getAny()
  );

  log('------------------')
const inf = Stream.infinite();
log(inf
    .filter((val) => val % 16  === 0)
    .map((val) => val * val)
    .map((val) => val - 420)
    .getNElements(2)
);

log('------------------')
const inf2 = Stream.infiniteFrom(-10);
log(inf2
    .filter(i => i > -20)
    .map(i => i * i)
    .filter(i => i === 4)
    .getAny()
)

log('------------------')
const ts1 = Stream.of([1, 2, 3]);
const ts2 = Stream.of([10, 20, 30]);

log(ts1.concat(ts2)
.filter((val) => val % 2 === 0)
.toList());
  
log('------------------')

//  //Testing api operations
 const url = 'https://swapi.dev/api/people/';

 const getPeople = async (num: number) => {
  return await get(`${url}${num}`);
 }



 // ---------------
*/
const isPrime = (num: number): boolean => {
for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if(num % i === 0) return false;
}
return num > 1;
}

log('------------------')
const primes = Stream.infiniteFrom(10000000000000)
  .map(val => val + 2 ) // there can't be an even prime number greater than 2
  .filter(isPrime)
  .getNElements(1);

// short memoizing fib definition
const fib = (n: number): number => {
  const memo: number[] = [0, 1];
  const fibHelper = (n: number): number => {
    if (memo[n] !== undefined) {
      return memo[n];
    }
    memo[n] = fibHelper(n - 1) + fibHelper(n - 2);
    return memo[n];
  }
  return fibHelper(n);
}

const infiniteStream = Stream.infinite(); // Infinite stream of numbers

const url = 'http://127.0.0.1:3000';

const getPeople = async (num: number) => {
 return await get(`${url}/people/${num}`);
}


const collected = infiniteStream
  .filter(_ => _ < 100)
  .map(fib) // Map to fibonacci numbers
  .toAsyncStream((_) => Promise.resolve(_)) // Convert to AsyncStream
  .filter(isPrime) // Filter prime numbers
  .map(getPeople) // Map to api calls
  .map((val) => val.data) // Extract data from response
  .collect(5); // Collect 5 elements and return responses
  
collected.then((val) => log(val)); // Print results
