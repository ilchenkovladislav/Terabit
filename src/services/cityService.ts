import axios from 'axios';
import { City } from '../models/city/city';

const CITY_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const CITY_REVERSE_API_URL = 'https://api.openweathermap.org/geo/1.0/reverse';
const API_KEY = import.meta.env.VITE_API_KEY;

export class CityService {
    private async fetchFromAPI(url: string, params: object): Promise<City[]> {
        const response = await axios.get(url, {
            params: { ...params, appid: API_KEY },
        });
        return response.data;
    }

    public async getCitiesByName(query: string): Promise<City[]> {
        return this.fetchFromAPI(CITY_API_URL, { q: query, limit: 5 });
    }

    public async getCityByCoordinates(
        lat: number,
        lon: number,
    ): Promise<City[]> {
        return this.fetchFromAPI(CITY_REVERSE_API_URL, { lat, lon });
    }
}
