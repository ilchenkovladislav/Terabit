import { CitySuggest } from '../../components/CitySuggest/CitySuggest.tsx';
import { CitiesList } from '../../components/CitiesList/CitiesList.tsx';
import { FormEvent, useEffect, useState } from 'react';
import { City } from '../../models/city/city.ts';
import { useFavoriteCities } from '../../hooks/useFavoriteCities.ts';
import s from './HomePage.module.scss';

export const HomePage = () => {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const { storeCity, deleteStoredCity, getStoredCities } =
        useFavoriteCities();

    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        setCities(getStoredCities());
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCity) return;

        setCities((prevState) => [
            ...prevState,
            { ...selectedCity, isFavorite: false },
        ]);
        setSelectedCity(null);
    };

    const handleDelete = (index: number) => {
        deleteStoredCity(cities[index]);
        setCities(cities.toSpliced(index, 1));
    };

    const handleFavorite = (index: number) => {
        const copyCity = structuredClone(cities[index]);

        copyCity.isFavorite = !copyCity.isFavorite;

        if (cities[index].isFavorite) {
            deleteStoredCity(copyCity);
        } else {
            storeCity(copyCity);
        }

        setCities(cities.with(index, copyCity));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={s.form}>
                <CitySuggest value={selectedCity} onChange={setSelectedCity} />
                <button type="submit" className={s.button}>
                    Добавить
                </button>
            </form>
            <CitiesList
                cities={cities}
                onDelete={handleDelete}
                onFavorite={handleFavorite}
                className={s.list}
            />
        </>
    );
};
