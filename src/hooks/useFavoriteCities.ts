import { City } from '../models/city/city.ts';

const STORAGE_KEY_FAVORITE = 'favoriteCities';

export const useFavoriteCities = () => {
    const getStoredCities = (): City[] => {
        const storageData = localStorage.getItem(STORAGE_KEY_FAVORITE);
        return storageData ? JSON.parse(storageData) : [];
    };

    const updateStoredCities = (cities: City[]) => {
        localStorage.setItem(STORAGE_KEY_FAVORITE, JSON.stringify(cities));
    };

    const storeCity = (city: City) => {
        const storedCities = getStoredCities();
        const updatedCities = [...storedCities, city];
        updateStoredCities(updatedCities);
    };

    const deleteStoredCity = (city: City) => {
        const storedCities = getStoredCities();
        const filteredCities = storedCities.filter(
            (storedCity) =>
                storedCity.lat !== city.lat && storedCity.lon !== city.lon,
        );
        updateStoredCities(filteredCities);
    };

    return {
        getStoredCities,
        storeCity,
        deleteStoredCity,
    };
};
