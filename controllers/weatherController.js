
// weatherController.js
// This controller is responsible for handling requests related to weather data.
// It uses the axios library to make HTTP requests to the weather API.

const tripModel = require('../models/tripModel');
const axios = require('axios');   // for weather


// Load the page to select a city for weather
const selectCityWeather = async (req, res) => {
    try {
        const cities = await tripModel.getCities();
        res.render('selectCityWeather', { cities, error: null });
    } catch (error) {
        res.render('selectCityWeather', { cities: [], error: error.message });
    }
};

// Load the page with the city, update by /weather
const weatherPage = async (req, res) => {
    const city = req.query.city || 'Toronto, Ontario, Canada';  // Default city is 'Toronto, Ontario, Canada' if none provided
    //const WEATHER_API_KEY = .....;
    //const url = .....

    try {
        // Fetch weather data from the API        
        // .....
        res.render('weather', { weatherData, city }); // Pass both weather data and city to EJS

    } catch (error) {
        console.error('Error fetching initial weather data:', error);
        res.render('weather', { weatherData: null, city }); // Ensure city is passed even if weather data is null

    }
};

// fetch weather data from the API, called by /weather
const weather = async (req, res) => {
    const city = req.query.city || 'Toronto, Ontario, Canada';  // Default city is 'Toronto, Ontario, Canada' if none provided
    //const WEATHER_API_KEY = .....;
    //const url = .....

    console.log(`Received request for weather in: ${city}`); // Log the city received from the request

    try {
        // Fetch weather data from the API


    } catch (error) {

    }
};

module.exports = {
    selectCityWeather,
    weatherPage,
    weather,
};
