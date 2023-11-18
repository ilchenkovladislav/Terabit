import axios from 'axios';

const weather_api_url = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_API_KEY;

export class WeatherService {
    async getCurrentWeather(lat: number, lon: number) {
        const res = await axios.get(weather_api_url, {
            params: { lat, lon, lang: 'ru', units: 'metric', appid: API_KEY },
        });
        return await res.data;
    }
}
