const name = "Judy";
let age = 20;

const greet = () => `Hello ${name}`;

const message = `${greet()}. You are ${age} years old. Cheers to more Adventures!`;

const trip = {
    destination: "Japan & South Korea",
    duration: "2 weeks",
    budget: 120000
};

const { destination, duration, budget } = trip;

const week1 = ["Tokyo Tour", "Mount Fuji Visit", "Shibuya Crossing Experience"];
const week2 = ["Seoul Palace Tour", "Myeongdong Shopping", "Han River Night View"];

const [firstPlan, secondPlan, thirdPlan] = week1;
const fullItinerary = [...week1, ...week2];

const displayOutput = () => {
    return `
        ${message}
        <br><br>
        <strong>Destination:</strong> ${destination} <br>
        <strong>Duration:</strong> ${duration} <br>
        <strong>Budget:</strong> ₱${budget.toLocaleString()} <br><br>

        <strong>Week 1 Highlights:</strong><br>
        ${firstPlan}, ${secondPlan}, ${thirdPlan} <br><br>

        <strong>Full Itinerary:</strong><br>
        ${fullItinerary.join(" | ")}
    `;
};

const output = document.getElementById("output");
output.innerHTML = displayOutput();