import cls from 'classnames';
import s from './CityCard.module.scss';
import { City } from '../../models/city/city.ts';
import { useEffect, useState } from 'react';
import { api } from '../../services/api.tsx';
import { CurrentWeather } from '../../models/weather/weather.ts';
import { Link } from 'react-router-dom';

type CityCardProps = {
    city: City;
    onDelete: () => void;
    onFavorite: () => void;
};

export const CityCard = (props: CityCardProps) => {
    const { city, onDelete, onFavorite } = props;
    const [weather, setWeather] = useState<CurrentWeather | null>(null);

    useEffect(() => {
        api.weather.getCurrentWeather(city.lat, city.lon).then(setWeather);
    }, []);

    return weather ? (
        <div className={cls(s.card)}>
            <header className={s.header}>
                <h3 className={s.name}>
                    {city.local_names['ru'] || city.name}
                </h3>
                <button onClick={onDelete} className={s.deleteBtn}>
                    x
                </button>
                <button
                    onClick={onFavorite}
                    className={cls(s.favoriteBtn, {
                        [s.favorite]: city.isFavorite,
                    })}
                >
                    like
                </button>
            </header>
            <div className={s.icon}>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Иконка погоды"
                />
            </div>
            <div className={s.temperature}>
                {Math.round(weather.main.temp)}°
            </div>
            <div className={s.description}>
                {weather.weather[0].description}
            </div>
            <div className={s.feelsLike}>
                Ощущается как {Math.round(weather.main.feels_like)}
            </div>
            <Link
                className={s.link}
                to={`week?lat=${weather.coord.lat}&lon=${weather.coord.lon}`}
            ></Link>
        </div>
    ) : null;
};
