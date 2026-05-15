let colors = ["red", "blue", "green", "yellow"];
let scores = [85, 92, 78, 64, 90];
let random = [true, "hello", 42, null, "world"];

console.log("--- subtask 2.1 ---")
console.log("Colors:", colors);
console.log("Scores:", scores);
console.log("Random Data:", random);

colors.push("orange");
colors.pop();
colors.shift();
colors.unshift("strawberry");

console.log("--- subtask 2.2 ---")
console.log("Number of scores:", scores.length);
console.log("Updated Colors:", colors);

let student = {
  name: "Jiji",
  age: 19,
  course: "Information Technology"
};

console.log("--- subtask 3.1 ---")
console.log("Student Object:", student);

console.log("--- subtask 3.2 ---")
console.log(student.name);
console.log(student["age"]);

student.school = "Universidad de Dagupan";
student["age"] = 21;

console.log("Updated Student:", student);

let grades = [70, 80, 92, 68, 74, 88];

let incentives = grades.map(grade => grade + 5);
console.log("Boosted Grades:", incentives);

let passingGrades = grades.filter(grade => grade >= 75);
console.log("Passing Grades:", passingGrades);

grades.forEach(grade => {
  console.log("Grade:", grade);
});