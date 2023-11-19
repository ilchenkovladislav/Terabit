import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api.tsx';
import { CurrentWeather } from '../../models/weather/weather.ts';
import s from './Week.module.scss';
import { format, fromUnixTime, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MainWeatherCard } from '../../components/MainWeatherCard/MainWeatherCard.tsx';
import { City } from '../../models/city/city.ts';

export const Week = () => {
    const [searchParams] = useSearchParams();
    const [weatherData, setWeatherData] = useState<CurrentWeather[]>([]);
    const [city, setCity] = useState<City>();

    useEffect(() => {
        const lat = Number(searchParams.get('lat'));
        const lon = Number(searchParams.get('lon'));

        api.weather
            .getWeekWeather(lat, lon)
            .then((data) => setWeatherData(data.list));

        api.city.getCityByCoords(lat, lon).then((data) => setCity(data[0]));
    }, []);

    const filterDates = (weathers: CurrentWeather[]) => {
        if (!weathers.length) return;
        const NUMBER_ENTRIES_PER_DAY = 8;
        const MIDDAY_ENTRY_NUMBER = 4;
        const weatherMap = [];

        const currentWeather = fromUnixTime(weathers[0].dt);
        weatherMap.push(weathers[0]);

        const otherWeathers = weathers.filter(
            (el) => !isSameDay(currentWeather, fromUnixTime(el.dt)),
        );

        for (
            let i = MIDDAY_ENTRY_NUMBER;
            i <= otherWeathers.length;
            i += NUMBER_ENTRIES_PER_DAY
        ) {
            weatherMap.push(otherWeathers[i]);
        }
        return weatherMap;
    };

    const data = filterDates(weatherData) || [];

    return (
        data.length && (
            <div>
                <h1>{city?.local_names?.['ru'] || city?.name}</h1>
                <div className={s.week}>
                    <MainWeatherCard weather={data[0]} className={s.main} />
                    {data &&
                        data.slice(1).map((el) => {
                            return (
                                <div className={s.other}>
                                    {format(fromUnixTime(el.dt), 'eeee', {
                                        locale: ru,
                                    })}{' '}
                                    <div>{Math.round(el.main.temp)}</div>
                                    <div>{el.weather[0].description}</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    );
};
