const userTab = document.querySelector("[data-userWeather]");
const searchTab =document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-con");
const grantAccessContainer = document.querySelector(".grant-loc-con");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-con");
const userInfoContainer = document.querySelector(".user-info-con");
const errorContainer = document.querySelector(".error-con");
errorContainer.classList.remove("active");


let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-Tab"); 
getfromSessionStorage();
function switchTab(newTab){
    if(oldTab != newTab){
        oldTab.classList.remove("current-Tab");
        oldTab = newTab;
        oldTab.classList.add("current-Tab");

        if(!searchForm.classList.contains("active")){
            //it means we are not in searchTab , we have to go in searchTab
            errorContainer.classList.remove("active");
            //remove grantAccess
            grantAccessContainer.classList.remove("active");
            //remove userTab
            userInfoContainer.classList.remove("active");
            //add searchForm
            searchForm.classList.add("active");  
        }  else{
            //means i m switching from search tab to user tab
            errorContainer.classList.remove("active");
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            errorContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}
userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})
//check if coordinates are already present in local storage
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    // make grant con invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");
    //API Call
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();  // Corrected this line
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch(err){
        loadingScreen.classList.remove("active");
        // console.error("Error fetching weather data:", err);
        errorContainer.classList.add("active");
        userInfoContainer.classList.remove("active");
        // Optionally handle the error, such as showing an error message to the user
    }
}


function renderWeatherInfo(data){
    //firstly fetch elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDes]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temperature = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity]");
    const clouds = document.querySelector("[data-clouds]");

    //fetch values from data to ui elements
    cityName.innerText = data?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temperature.innerText = `${data?.main?.temp} °C`;
    windSpeed.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText = `${data?.main?.humidity}%`;
    clouds.innerText = `${data?.clouds?.all}%`;
}
function getLocation(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{

    }
}
function showPosition(position){
    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));

    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessBtn = document.querySelector("[data-grantAccess]");
grantAccessBtn.addEventListener("click",getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let city = searchInput.value;

    if(city === ""){
        return;
    }else{
        fetchSearchWeatherInfo(city);
    }
})
async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        if (response.ok) {
            userInfoContainer.classList.add("active");
            errorContainer.classList.remove("active");
            renderWeatherInfo(data);
        } else {
            throw new Error("City not found");
        }
    }
    catch(e){
        loadingScreen.classList.remove("active");
        errorContainer.classList.add("active");
        userInfoContainer.classList.remove("active");
    }
}