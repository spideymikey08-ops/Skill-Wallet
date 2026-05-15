const numbers = [10, 20, 30];
const [a, b, c] = numbers;

console.log(a, b, c);

const colors = ["red", "green", "blue"];
const [first, , third] = colors;

console.log(first, third);

const nums = [1];
const [x, y = 5] = nums;

console.log(x, y);

const person = {
  name: "Jul",
  age: 21
};
const { name, age } = person;

console.log(name, age);

const { name: fullName, age: years } = person;
console.log(fullName, years);

const user = {
  id: 1,
  profile: {
    username: "jul123",
    email: "jul@example.com"
  }
};
const {
  profile: { username, email }
} = user;

console.log(username, email);

const settings = {
  audio: "korean"
};

const { audio, subtitles = "en" } = settings;

console.log(audio, subtitles);

const data = {
  id: 2,
  info: {
    title: "JS Guide"
  }
};

const {
  info: { title: bookTitle, author = "Unknown" }
} = data;

console.log(bookTitle, author);

function displayUser({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

displayUser({ name: "Shepard", age: 12 });