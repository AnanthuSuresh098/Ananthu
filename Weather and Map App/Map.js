//getting the input value from local storage
const input = JSON.parse(localStorage.getItem("input"));

const map = document.getElementById("map");

//displaying map for the input
map.innerHTML = `<iframe
        width="999"
        height="560"
        style="border:0"
        loading="lazy"
        
        allowfullscreen
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDKXrOk1rX2Jkwei9LGizYnjDErXrnuknI
    &q=${input}">
    </iframe>`;

//redirecting to the home page
let displayHome = () => {
  window.location.href = "Weather.html";
};
