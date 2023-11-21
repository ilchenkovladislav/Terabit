import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEEK_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export class WeatherService {
    private async fetchFromAPI(url: string, lat: number, lon: number) {
        const response = await axios.get(url, {
            params: { lat, lon, lang: 'ru', units: 'metric', appid: API_KEY },
        });
        return response.data;
    }

    public async getCurrentWeather(lat: number, lon: number) {
        return this.fetchFromAPI(CURRENT_WEATHER_URL, lat, lon);
    }

    public async getWeekWeather(lat: number, lon: number) {
        return this.fetchFromAPI(WEEK_WEATHER_URL, lat, lon);
    }
}
