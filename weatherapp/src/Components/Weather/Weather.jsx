import React from "react";
import { useState } from "react";
import './Weather.css';

const key = '4d8fb5b93d4af21d66a2948710284366';

function Weather(){

    const[location, setLocation] = useState("");
    const[weather, setWeather] = useState(null);
    const[error, setError] = useState("");

    const submitform = async (e) => {
        e.preventDefault();

        if(!location.trim()){
            alert("Please Enter a City Name");
            return;
        }

        try{
            const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`);
            const data = await result.json();
            console.log(result);
            if(result.ok){
                setWeather(data);
                setError("");
                setLocation("");
            }else{
                setWeather(null);
                setError(`${data.message}`)
            }
        }
        catch(error){
            setWeather(null);
            setError("An Error : something went wrong");
        }

    }

    return(
        <div className="body">
            <div className="layout">
                <nav>
                    <img className="image" src="https://img.icons8.com/fluency/96/000000/smiling-sun.png" alt="" />
                    <h2>Weather App</h2>
                    <img className="image" src="https://img.icons8.com/fluency/96/000000/smiling-sun.png" alt="" />
                </nav>
                <div className="mainlayout">
                    <form onSubmit={submitform}>
                        <input type="text"  className="Input" placeholder="Search by city name" value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <button className="button">Search</button>
                        {
                    weather &&(
                        <div className="weather-info">
                            <div className="cloudy">
                                <h2>{`${Math.round(weather.main.temp)}°C`}</h2>
                                <img src="https://img.icons8.com/fluency/96/000000/moderate-rain.png" alt=""/>
                            </div>
                            <p className="Text">{weather.weather[0].description}</p>
                            <h2>{`${weather.name}, ${weather.sys.country}`}</h2>
                            <div className="totallayout">
                                <div className="minimage">
                                    <div className="min-max">
                                        <p>Min Temp: {Math.round(weather.main.temp_min)}°C</p>
                                        <p>Max Temp: {Math.round(weather.main.temp_max)}°C</p>
                                    </div>
                                    <div>
                                        <img  className="sunny" src="https://img.icons8.com/fluency/96/000000/smiling-sun.png" alt="" />
                                    </div>
                                </div>
                                <div className="div2">
                                    <div className="humidity">
                                        <p>Humidity:{weather.main.humidity}%</p><img className="humidityimage" src="https://img.icons8.com/fluency/48/000000/hygrometer.png" alt=""/>
                                    </div>
                                    <div className="wind">
                                        <p>Wind: {weather.wind.speed} m/s</p><img className="windimage" src="https://img.icons8.com/fluency/48/000000/wind.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Weather;