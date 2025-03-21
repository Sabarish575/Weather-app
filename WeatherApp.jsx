import React, { useState } from "react";
import "./Weather-App.css";

function WeatherApp() {
    const api_key = "b22367f2ef5d39c1a79abb56b2b64f96";

    const [city, setCity] = useState("");
    const [convertor, setConvertor] = useState(false);
    const [weather, setWeather] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    async function fetchInfo(city) {
        if (city.trim() === "") {
            setConvertor(true);
            setMessage("Enter a valid city Name");
            return;
        }
        setLoading(true);
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                setConvertor(true);
                setMessage("Error: Failed to fetch weather.");
                return;
            }

            const data = await response.json();
            setWeather(data);
            setConvertor(false);
        } catch (e) {
            console.error(e);
            setConvertor(true);
            setMessage("Failed to fetch weather. Try again!");
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="outer-cont">
            <h1>Weather App
                <hr></hr>
            </h1>

            <div className="input-cont">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter the city name.."
                />
                <button onClick={() => fetchInfo(city)}>Fetch Weather</button>
            </div>

            {loading ? (
                <h1>Fetching data...</h1>
            ) : convertor ? (
                <div className="ans-cont">
                    <h1>{message}</h1>
                </div>
            ) : weather ? (
                <div className="ans-cont">
                    {weather.weather[0].main==="Clouds"?(
                        <div className="cloud"></div>
                    ):(weather.weather[0].main==="Clear")?(
                        <div className="clear"></div>
                    ):(weather.weather[0].main==="Rain")?(
                        <div className="rain"></div>
                    ):(weather.weather[0].main==="Snow")?(
                        <div className="snow"></div>
                    ):(weather.weather[0].main==="Thunderstorm")?(
                        <div className="thunder">
                            <div class="lightning"></div>
                            <div class="lightning"></div>
                            <div class="lightning"></div>
                        </div>
                    ):(
                        <div className="default"></div>
                    )}
                        <>
                            <div className="data">
                                <h1>{weather.main.temp}°C</h1>
                                <div className="inner-data">
                                    <p>{weather.name}, {weather.sys.country}</p>
                                    <p>{weather.weather[0].main}</p>
                                </div>
                            </div>
                        </>
                </div>
            ) : null}
        </div>
    );
}

export default WeatherApp;
