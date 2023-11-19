import axios from 'axios';

const appAxios = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
});

// const weather_api_url = 'https://api.openweathermap.org/data/2.5/weather';
// const week_weather_api_url =
//     'https://api.openweathermap.org/data/2.5/forecast/';
const API_KEY = import.meta.env.VITE_API_KEY;

export class WeatherService {
    async getCurrentWeather(lat: number, lon: number) {
        const res = await appAxios.get('weather', {
            params: { lat, lon, lang: 'ru', units: 'metric', appid: API_KEY },
        });
        return await res.data;
    }

    async getWeekWeather(lat: number, lon: number) {
        const res = await appAxios.get('forecast', {
            params: {
                lat,
                lon,
                lang: 'ru',
                units: 'metric',
                appid: API_KEY,
            },
        });
        return await res.data;
    }
}
