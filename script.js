//Animation slider to right
const observer = new IntersectionObserver((enteries) => {
    enteries.forEach((entry) =>{
        console.log(entry);
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show')
        }
    })
})
  
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/*
Credits for the API
https://documenter.getpostman.com/view/10724784/SzYXWz3x

Data for the API
https://www.sciencedirect.com/science/article/pii/S1473309920301201?via%3Dihub
*/

//Last date of update for the API
const date = "2023-03-09";
function getSelectedCountry() {
    //Get the selected country from the dropdown
    var countryDropdown = document.getElementById("countryDropdown");
    var selectedCountry = countryDropdown.options[countryDropdown.selectedIndex].value;

    //Display the selected country in the console(remove later)
    //console.log("Selected Country: " + selectedCountry);

    //Get information from API
    var url = "https://covid-api.com/api/reports?date=" + date + "&iso=" + selectedCountry;
    fetch(url)
        .then(function(response){
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function(data) {
            //Retrieve Covid-19 data
            //console.log(data.data[0]); //Entire data
            var content_cases = data.data[0].confirmed;
            var content_deaths = data.data[0].deaths;

        //Update HTML with Covid-19 data
        document.getElementById("cases").innerHTML = content_cases;
        document.getElementById("deaths").innerHTML = content_deaths;

        //Store Covid-19 data in local storage
        localStorage.setItem("cases", JSON.stringify(content_cases));
        localStorage.setItem("deaths", JSON.stringify(content_deaths));

        // Call drawChart function after updating data  
        drawChart();
        })
        .catch(function(error) {
            //Handle errors during the fetch operation
            console.error("Error during fetch operation:", error);
            });
}

//ScratchCard
const createScratchCard = (canvasId, color) => {
    let canvas = document.getElementById(canvasId);
    let context = canvas.getContext("2d");
  
    const init = () => {
        context.fillStyle = color;
        context.fillRect(0,0,500,100);
    }
  
    let isDragging = false;
  
    const scratch = (x, y) => {
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x,y,24,0, 2*Math.PI);
        context.fill();
    }
  
    canvas.addEventListener("mousedown", (event) =>{
        isDragging = true;
        scratch(event.offsetX, event.offsetY);
    })
  
    canvas.addEventListener("mousemove", (event) => {
        if(isDragging)
        {
            scratch(event.offsetX, event.offsetY);
        }
    })
  
    canvas.addEventListener("mouseup", (event) => {
        isDragging= false; 
    })
    canvas.addEventListener("mouseleave", (event) => {
        isDragging = false;
    })
    init()
};
createScratchCard("scratch-card01", "green")
  
//Pop up sign up form
function submitSignUpForm() {
    document.addEventListener('DOMContentLoaded', function () {
        //Get stored user data if any
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        //Get signUpform in signUp.html
        const signUpForm = document.getElementById('signUpForm');
        signUpForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            //Get values of name and email when button clicked
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            //Save user data to local storage
            if (name && email) {
                const userData = {
                    name: name,
                    email: email
                };
            localStorage.setItem('userData', JSON.stringify(userData));
            
            
            const userGreeting = document.getElementById('userGreeting');
            userGreeting.textContent = `Hi, ${name}`;

            } else {
                alert('Please fill in all fields with valid information.');
            }
        });
    });
    //Make overlay(sign-up form) invisible
    document.getElementById("overlay").style.display = "none";

    //Display greeting in overlay2 greeting)
    const name = document.getElementById('name').value;
    const userGreeting = document.getElementById('userGreeting');
    userGreeting.textContent = `Hi, ${name}`;

    //Make overlay2(greeting) visible and invisible after 3 seconds
    document.getElementById("overlay2").style.display = "flex";
    setTimeout(closethanks,3000);
}
  
function openForm() {
    document.getElementById("overlay").style.display = "flex";
}

function closeForm() {
    document.getElementById("overlay").style.display = "none";
}
function closethanks(){
    document.getElementById("overlay2").style.display = "none";
}

document.getElementById("open-form-link").addEventListener("click", openForm);
