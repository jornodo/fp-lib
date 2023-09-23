import { Stream } from "../src/fp-lib/Stream";


const isPrime = (num: number): boolean => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
    }

const testStreamGetOne = (data: number[]) => {
    const start = performance.now();
    const stream = Stream.of(data);

    const result = stream
        .filter(isPrime)
        .map((val) => val * val)
        .map((val) => val - 420)
        .getAny();


  const end = performance.now();
  
  return { result, time: end - start };
}

const testPrototypeGetOne = (data: number[]) => {
    const start = performance.now();
    const result = data
        .filter(isPrime)
        .map((val) => val * val)
        .map((val) => val - 420)
        .find(() => true);

  const end = performance.now();
  
  return { result, time: end - start };
}

const testStreamGetAll = (data: number[]) => {
    const start = performance.now();
    const stream = Stream.of(data);

    const result = stream
        .filter(isPrime)
        .map((val) => val * val)
        .map((val) => val - 420)
        .toList();

    const end = performance.now();

    return { result, time: end - start };
}

const testPrototypeGetAll = (data: number[]) => {
    const start = performance.now();
    const result = data
        .filter(isPrime)
        .map((val) => val * val)
        .map((val) => val - 420)

    const end = performance.now();

    return { result, time: end - start };
}

export const printAllResults = (n: number ) => {
    const testData = Array.from({ length: n }, () => Math.floor(Math.random() * n));
    const streamGetOne = testStreamGetOne(testData);
    const prototypeGetOne = testPrototypeGetOne(testData);
    const streamGetAll = testStreamGetAll(testData);
    const prototypeGetAll = testPrototypeGetAll(testData);

    console.log('_'.repeat(50));
    console.log(`Testing with ${n} elements`);

    console.log('Stream get one: ', streamGetOne.time);
    console.log('Prototype get one: ', prototypeGetOne.time);
    console.log('Stream get all: ', streamGetAll.time);
    console.log('Prototype get all: ', prototypeGetAll.time);

    console.log(`Stream get one is ${prototypeGetOne.time / streamGetOne.time} times faster than prototype get one`);
    console.log(`Stream get all is ${prototypeGetAll.time / streamGetAll.time} times faster than prototype get all`);
}