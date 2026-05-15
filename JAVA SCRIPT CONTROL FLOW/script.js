console.log("---subtask 2.1---");
let speed = 75;
if (speed >= 120) {
    console.log("Severe violation! License suspension risk.");
} else if (speed >= 100) {
    console.log("High speed violation. Heavy fine issued.");
} else if (speed >= 80) {
    console.log("Speeding detected. You will receive a fine.");
} else if (speed >= 60) {
    console.log("Warning: Slightly above safe speed limit.");
} else {
    console.log("Safe driving. No violation.");
}

console.log("---subtask 3.1---");
for (let i = 1; i <= 5; i++) {
    console.log("For Loop Count:", i);
}

let count = 1;
while (count <= 5) {
    console.log("While Loop Count:", count);
    count++;
}

console.log("---subtask 4.1---");
function greet(name) {
    console.log("Hello, " + name + "!");
}

function add(a, b) {
    return a + b;
}

greet("Student");

let result = add(10, 20);
console.log("Sum:", result);