export const logger = <T, U>(fn: (a :T) => U) => (a: T): U => {
    console.log(`Applying ${fn}, to value: ${a}`);
    return fn(a);
}