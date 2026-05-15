const destination = document.getElementById("destination");
const notes = document.getElementById("notes");
const exploreBtn = document.getElementById("exploreBtn");
const form = document.getElementById("bookingForm");
const travelerName = document.getElementById("travelerName");
const card = document.getElementById("destinationCard");
const output = document.getElementById("output");

exploreBtn.addEventListener("click", () => {
    output.textContent = destination.value
        ? `Exploring ${destination.value} ✈️`
        : "Please select a destination first!";
});

notes.addEventListener("input", () => {
    output.textContent = `Travel Notes: ${notes.value}`;
});

destination.addEventListener("change", () => {
    output.textContent = `Destination selected: ${destination.value}`;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!travelerName.value) {
        output.textContent = "Please enter your name!";
        return;
    }

    output.textContent = `${travelerName.value} booked a trip to ${destination.value} 🎉`;
});

notes.addEventListener("keyup", (e) => {
    console.log("Last key pressed:", e.key);
});

card.addEventListener("mouseover", () => {
    card.style.background = "#51dceb";
    card.textContent = "🌍 Discover amazing places!";
});

card.addEventListener("mouseout", () => {
    card.style.background = "#eee";
    card.textContent = "🌴 Hover to preview destination";
});

notes.addEventListener("focus", () => {
    notes.style.background = "#fff3e0";
});

notes.addEventListener("blur", () => {
    notes.style.background = "white";
});