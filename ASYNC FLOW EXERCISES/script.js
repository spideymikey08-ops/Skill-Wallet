console.log("A");
console.log("B");
console.log("C");

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");

console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("3");
test();
console.log("4");

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");