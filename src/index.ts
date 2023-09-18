import { log } from 'console';
import { Option } from './fp-lib/Option';
import { Stream } from './fp-lib/Stream';
import { GStream } from './fp-lib/GStream';
import get from 'axios';

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

const ls = GStream.of([1, 2, 3, 4, 5, 6, 7, 8]);
log(
  ls.map((val) => val + 6)
    .filter((val) => val % 2 === 0)
    .getAny()
  );

  log('------------------')
const inf = GStream.infinite();
log(inf
    .filter((val) => val % 16  === 0)
    .map((val) => val * val)
    .map((val) => val - 420)
    .getNElements(2)
);

log('------------------')
const inf2 = GStream.infiniteFrom(-10);
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

// Testing api operations
// const url = 'https://swapi.dev/api/people/';

// const getPeople = async (num: number) => {
//  return await get(`${url}${num}`);
// }

// const people = GStream.infinite()
//   .map(val => val + 2)
//   .map(async (val) => await getPeople(val).then((res) => res.data.name))
//   .getNElements(10)
//   .forEach(async (val) => log(await val));




