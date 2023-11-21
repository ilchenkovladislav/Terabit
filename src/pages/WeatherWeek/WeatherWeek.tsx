import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import { api } from '@/services/api.tsx';
import { filterDates } from '@/utilities/dateUtility.ts';

import type { City } from '@/models/city/city.ts';
import type { Weather } from '@/models/weather/weather.ts';

import { Loader } from '@/components/Loader/Loader.tsx';
import { TodayWeatherCard } from './components/TodayWeatherCard/TodayWeatherCard';
import { DailyWeatherCard } from './components/DailyWeatherCard/DailyWeatherCard';

import s from './WeatherWeek.module.scss';
import { Container } from '@/components/Container/Container.tsx';

export const WeatherWeek = () => {
    const [searchParams] = useSearchParams();
    const [weatherData, setWeatherData] = useState<Weather[]>([]);
    const [city, setCity] = useState<City>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherAndCityData = async () => {
            const lat = Number(searchParams.get('lat')) || 50.5956;
            const lon = Number(searchParams.get('lon')) || 36.5873;

            try {
                const [weatherResponse, cityResponse] = await Promise.all([
                    api.weather.getWeekWeather(lat, lon),
                    api.city.getCityByCoordinates(lat, lon),
                ]);

                setWeatherData(filterDates(weatherResponse.list));
                setCity(cityResponse[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeatherAndCityData();
    }, []);

    const renderBackLink = () => (
        <Link to="/" className={s.backlink}>
            <FaChevronLeft />{' '}
            {city ? city?.local_names?.['ru'] || city?.name : 'Не найдено'}
        </Link>
    );

    const renderWeatherCards = () => (
        <div className={s.cards}>
            <TodayWeatherCard weather={weatherData[0]} className={s.today} />
            <div className={s.dailyCards}>
                {weatherData.slice(1).map((weather, index) => (
                    <DailyWeatherCard key={index} weather={weather} />
                ))}
            </div>
        </div>
    );

    if (isLoading) return <Loader />;

    return (
        !!weatherData.length && (
            <Container>
                <div className={s.week}>
                    {renderBackLink()}
                    {renderWeatherCards()}
                </div>
            </Container>
        )
    );
};
