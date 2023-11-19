import axios from 'axios';
import { City } from '../models/city/city';

const city_api_url = 'https://api.openweathermap.org/geo/1.0/direct';
const city_reverse_api_url = 'https://api.openweathermap.org/geo/1.0/reverse';
const API_KEY = import.meta.env.VITE_API_KEY;

export class CityService {
    async getCities(query: string): Promise<City[]> {
        const res = await axios.get(city_api_url, {
            params: { q: query, limit: 5, appid: API_KEY },
        });
        return await res.data;
    }

    async getCityByCoords(lat: number, lon: number) {
        const res = await axios.get(city_reverse_api_url, {
            params: { lat, lon, appid: API_KEY },
        });
        return await res.data;
    }
}
