import { WeatherService } from './weatherService';
import { CityService } from './cityService';

class Api {
    public weather: WeatherService = new WeatherService();
    public city: CityService = new CityService();
}

export const api = new Api();
