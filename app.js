
const weatherSearch = document.querySelector(".weatherSearch");
const cityInput = document.querySelector(".cityInput");
const searchbutton = document.querySelector(".searchbutton");
const card = document.querySelector(".card");

const apiKey = "7f5edc36a3d5a752fba078f85e0950c4";

weatherSearch.addEventListener('submit', async function(event){

    event.preventDefault();

    const city = cityInput.value;

    if(city){

        try{

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }

        catch(error){

            console.error(error);
            displayError(error);
        }

    }

    else{
        displayError("Please enter a city");
    }
    
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(response.ok === false){
        throw new Error("Could not fetch data")
    }

    return await response.json();
    
    
}

function displayWeatherInfo(data){

    const{name: city, 
          main: {temp, humidity}, 
          weather: [{description, id}]} = data;

    console.log(data);

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humdityDisplay = document.createElement('p');
    const weatherinfo = document.createElement('p');
    const weatherImg = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    humdityDisplay.textContent = `Humidity: ${humidity} %`;
    weatherinfo.textContent = description;
    weatherImg.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humdityDisplay.classList.add("humidityDisplay");
    weatherinfo.classList.add("weatherinfo");
    weatherImg.classList.add("weatherImg");



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humdityDisplay);
    card.appendChild(weatherinfo);
    card.appendChild(weatherImg);



    

}

function getWeatherEmoji(weatherID){

    if(weatherID >= 200 && weatherID < 300){

        return "⛈️";

    }

    else if(weatherID >= 300 && weatherID < 400){

        return "🌧️";

    }

    else if(weatherID >= 400 && weatherID < 500){

        return "🌧️";
    }

    else if(weatherID >= 500 && weatherID < 600){

        return "🌦️";
    }

    else if(weatherID >= 600 && weatherID < 700){

        return "🌫️";

    }

    else if(weatherID >= 700 && weatherID < 800){

        return "☀️";

    }

    else if(weatherID>=800){

        return "⛅";
    }

    else{
        return "🤷‍♂️";
    }


}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}



