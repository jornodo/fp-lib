import { log } from 'console';
import { Option } from './fp-lib/Option';

console.log('Hello World!');

const a: Option<string> = Option.of('Hello World!');

// console.log(a);
// console.log(a.of('test'))

const b = Option.of(5);

// console.log(b.map((val) => val + 1).getOrElse(0));

const c = Option.of(undefined);

// console.log(Option.of(undefined)
//   .map((val) => val + 1)
//   .map((val) => val + 1)
//   .getOrElse(0));


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
 
li.map(o => Option.of(o)).map((o) => o.tryCatch((val) => <number> val + 1))
.forEach((o) => log(o.get() instanceof Error ? (o.get() as Error).message : o.get()))

log('------------------')

const one = Option.of(1);

