import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa';
import cls from 'classnames';

import { api } from '../../services/api';

import { Loader } from '../Loader/Loader';
import type { City } from '../../models/city/city';
import type { Weather } from '../../models/weather/weather';

import s from './CityCard.module.scss';

type CityCardProps = {
    city: City;
    handleDelete: () => void;
    handleFavorite: () => void;
};

export const CityCard = (props: CityCardProps) => {
    const { city, handleDelete, handleFavorite } = props;
    const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentWeather = async (lat: number, lon: number) => {
            try {
                const weather = await api.weather.getCurrentWeather(lat, lon);
                setCurrentWeather(weather);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentWeather(city.lat, city.lon);
    }, []);

    if (isLoading) return <Loader />;

    return currentWeather ? (
        <div className={cls(s.card)}>
            <header className={s.header}>
                <h3 className={s.name}>
                    {city.local_names?.['ru'] || city.name}
                </h3>
                <button
                    onClick={handleFavorite}
                    className={cls(s.iconButton, s.favoriteButton, {
                        [s.favorite]: city.isFavorite,
                    })}
                >
                    <FaRegHeart />
                </button>
                <button
                    onClick={handleDelete}
                    className={cls(s.iconButton, s.deleteButton)}
                >
                    <IoMdClose />
                </button>
            </header>
            <div className={s.icon}>
                <img
                    src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                    alt="Иконка погоды"
                />
            </div>
            <div className={s.temperature}>
                {Math.round(currentWeather.main.temp)}°
            </div>
            <div className={s.description}>
                {currentWeather.weather[0].description}
            </div>
            <div className={s.feelsLike}>
                Ощущается как {Math.round(currentWeather.main.feels_like)}
            </div>
            <Link
                className={s.link}
                to={`week?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}`}
            ></Link>
        </div>
    ) : null;
};
