const wrapper = document.querySelector('.wrapper');
const form = document.getElementById("weatherform");
const input = document.getElementById("weatherinput");

const city_array = [];

const getdayofweek = () => {
const d = new Date();
let today = d.getDay();

switch (today) {
    case 0: "Sunday"
    break;
    case 1: "Monday"
    break;
    case 2: "Tuesday"
    break;
    case 3: "Wednesday"
    break;
    case 4: "Thursday"
    break;
    case 5: "Friday"
    break;
    case 6: "saturday"
}
return today
}



form.addEventListener("submit", showweather = async (e) => {
    e.preventdefault;

        let location = input.value;
        const result = await fetch('http://api.openweathermap.org/data/2.5/forecast?q='+location+'&units=metric&appid=3ee1b28549d7bac27faae1a3fead6ee4');
        const data = await result.json()
        
        console.log(data);

        switch (data.cod) {
            default:    switch(city_array.indexOf(data.city.name)) { //prevent same place showing multiple times
                        case -1: createcard(data);
                        break;
                        default: console.log("already there")
            }
            break;
            case "400": console.log("nothing here") 
            break;
            case "404": console.log("not a place")
            break;
        }
})

const createcard = (data) => {
    
    city_array.splice(0,0,data.city.name);
    console.log(city_array)

    const wrapper_row=document.createElement("div");
    wrapper_row.className="wrapperrow";
    wrapper.appendChild(wrapper_row)

    const weather_row=document.createElement("div");
    weather_row.className="weatherrow";
    wrapper_row.appendChild(weather_row);

    const weather_back=document.createElement("div");
    weather_back.className="weatherback";
    wrapper_row.appendChild(weather_back);

    const weather_in=document.createElement("p");
    weather_in.className="weather_in"
    weather_in.innerHTML="Weather in<br>"+data.city.name;
    weather_back.appendChild(weather_in);

    for(i=0, x=0;i<40;i=i+8,x++) {
    
    const weathercard=document.createElement("div");
    weathercard.className="weathercard";  
    weather_row.appendChild(weathercard);

    const icon = document.createElement("img");
    weathercard.appendChild(icon);
    icon.src="http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon +"@2x.png"

    const city_name = document.createElement("h2");
    weathercard.appendChild(city_name);
    city_name.innerText = data.city.name;

    const weatherdescription = document.createElement("p");
    weathercard.appendChild(weatherdescription);
    weatherdescription.innerText = data.list[i].weather[0].description;

    const current_temp = document.createElement("p");
    weathercard.appendChild(current_temp);
    current_temp.innerText = data.list[i].main.temp + " °C"

    const currentday = document.createElement("p");
    currentday.className='currentday';
    const day = data.list[i].dt_txt; 
    currentday.innerHTML = new Date(day).toLocaleDateString("en-US",{weekday: "long"});
    weathercard.appendChild(currentday);
    }
}
