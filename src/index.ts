import { log } from 'console';
import { Option } from './fp-lib/Option';
import { Stream } from './fp-lib/Stream';
import { GStream } from './fp-lib/GStream';

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
  ls.filter((val) => val % 2 === 0)
    .getAny()
  );
  



