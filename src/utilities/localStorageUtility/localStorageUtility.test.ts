import { describe, beforeEach, it, expect } from 'vitest';

import {
    getStoredCities,
    storeCity,
    deleteStoredCity,
} from './localStorageUtility.ts';
import { City } from '../../models/city/city.ts';

describe('City storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should store a city', () => {
        const city: City = { lat: 1, lon: 1 };
        storeCity(city);
        expect(getStoredCities()).toEqual([city]);
    });

    it('should delete a stored city', () => {
        const city: City = { lat: 1, lon: 1 };
        storeCity(city);
        deleteStoredCity(city);
        expect(getStoredCities()).toEqual([]);
    });

    it('should not delete a city that is not stored', () => {
        const city: City = { lat: 1, lon: 1 };
        const otherCity: City = { lat: 2, lon: 2 };
        storeCity(city);
        deleteStoredCity(otherCity);
        expect(getStoredCities()).toEqual([city]);
    });
});
